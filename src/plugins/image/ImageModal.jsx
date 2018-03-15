import React from 'react';
import {insertDataBlock} from "megadraft";
import ReactResumableJs from 'react-resumable-js'
import axios from 'axios';
import config from "./config";
import Modal from "react-responsive-modal";
import ImageBlockStyle from "./ImageBlockStyle";

const MAX_FILES = 15;
const MESSAGE_ERROR = 'Algunas imágenes pueden no haber subido por el error.';
const INITIAL_MESSAGE = {
	status: 'info',
	text: 'Seleccioná una o varias imágenes (máximo ' + MAX_FILES + ')'
};

export default class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: INITIAL_MESSAGE,
            resumableHeaders: {},
			errors: [],
			images: {}
        };
    }

    componentDidMount(){
        this.getResumableHeaders();
    }

    addImage = (image) => {
			this.setState(prevState => {
				return {
					images: {
						...prevState.images,
						[image.file.name]: image
					}
				};
			});
		};

    addError = (message) => {
    	this.setState(prevState => {
    		return {
					errors: [...prevState.errors, message]
					}
    	});
    };

    removeImage = (image) =>{
			this.setState(prevState => {
				let newState = {};

				newState.images = Object
					.keys(prevState.images)
					.filter(fileName => fileName !== image.file.name)
					.reduce((all, filename) => {
						all[filename] = prevState.images[filename];
						return all;
					}, {});

				if (!Object.keys(newState.images).length) {
					newState.message = INITIAL_MESSAGE;
				}

				return newState;
			});
		};

    addData = (dataObj) => {
        const data = {
        	filename: dataObj.data,
					type: dataObj.type,
					dataType: dataObj.type,
					src:config.tmpDir + dataObj.data
        };

				setImmediate(() => {
						this.props.onChange(insertDataBlock(this.props.editorState, data));
				});
    };

    saveData = (e) => {
    		const images = this.state.images;

        Object
					.keys(images)
					.map(key => {
							const image = images[key];
							this.addData({
								type: 'image',
								data: image.fileName
							});
				});

			  this.handleClose(e);
    };

    handleClose = (e) => {
        this.setState({
					isShowingModal: false,
					message: INITIAL_MESSAGE,
					images: {},
					errors: []
        });
        this.props.closeModal(e);
    };

    getResumableHeaders = () => {
        axios.get( config.tokenEndpoint)
            .then(function (response) {
                this.setState({
                    resumableHeaders: {
                        "X-CSRF-Token": response.data
                    }
                });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
			const disableSubmit = !Object.keys(this.state.images).length;

			let message = this.state.message.text;
			let warning_message = '';

			if (this.state.errors.length > 0) {
					message = this.state.errors.join('\n');
					warning_message = MESSAGE_ERROR;
				}

			return <div className="modal-wrapper">
						<Modal open={this.props.isShowingModal}
									 onClose={this.handleClose}
									 styles={ImageBlockStyle.modal}
									 closeOnOverlayClick={false}
						>
									<h3>{message}</h3>
									<p>{warning_message}</p>
									<ReactResumableJs
											headerObject={this.state.resumableHeaders}
											uploaderID="image-upload"
											dropTargetID="myDropTarget"
											filetypes={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
											maxFileSize={5242880}
											fileAccept="image/jpeg, image/png"
											fileAddedMessage="Started!"
											completedMessage="Complete!"
											service={config.resumableService}
											disableDragAndDrop={true}
											fileNameServer="file"
											tmpDir={config.tmpDir}
											maxFiles={MAX_FILES}
											onFileSuccess={(file, message) => {this.addImage(file);}}
											onFileAdded={(file, resumable) => {resumable.upload();}}
											onFileRemoved={(file) => {this.removeImage(file);}}
											onMaxFileSizeErrorCallback={(file) => {this.addError(file.name + " tamaño superior a 5 megas.")}}
											onUploadErrorCallback={(file, error) => {this.addError(JSON.parse(error).error)}}
											onFileAddedError={(file) => {this.addError(file.name + " archivo no valido.")}}
									/>

									<div className="form-actions">
											<button
												className="btn  btn-primary form-submit btn-block"
												disabled={disableSubmit}
												onClick={this.saveData}>Aceptar</button>
									</div>
						</Modal>
        </div>;
    }
}
