import React from 'react';
import {insertDataBlock} from "megadraft";
import {ModalDialog, ModalContainer} from 'react-modal-dialog';
import ReactResumableJs from 'react-resumable-js'
import axios from 'axios';
import config from "./config";


export default class View extends React.Component {
		initialMessage = {status: 'info', text: 'Seleccioná una o varias imágenes (máximo 15)'};
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: this.props.isShowingModal,
            message: this.initialMessage,
            resumableHeaders: {},
						error: false,
						images: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal
        });
    }

    componentDidMount(){
        this.getResumableHeaders();
    }

    addImage = (image) => {
			this.setState(prevState => {
				const images = prevState.images;
				images[image.file.name] = image;
				return { images: images}
			});
		};

    removeImage = (image) =>{
			this.setState(prevState => {
				let images = prevState.images;
				delete images[image.file.name];
				if(!Object.values(images).length){
						return {
							message: this.initialMessage,
							images: {}
						}
				}
				return { images: images}
			});
		};

    addData = (dataObj) => {
        const data = {filename: dataObj.data, type: dataObj.type, dataType: dataObj.type, src:config.tmpDir + dataObj.data};
				setImmediate(() => {
						this.props.onChange(insertDataBlock(this.props.editorState, data));
				});
    };

    saveData = (e) => {
        Object.values(this.state.images).map((image) => {
					this.addData({data: image.fileName, type: 'image'});
				});
			  this.handleClose(e);
    };

    handleClose = (e) => {
        this.setState({isShowingModal: false});
        this.setState({message: this.initialMessage});
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

    render(){


        return <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog" onClose={this.handleClose}>
                        <div className={'alert alert-' + this.state.message.status} role="alert"
                             dangerouslySetInnerHTML={{__html: this.state.message.text}}>
                        </div>

                        <ReactResumableJs
                            headerObject={this.state.resumableHeaders}
                            uploaderID="image-upload"
                            dropTargetID="myDropTarget"
                            filetypes={["jpg", "JPG", "png", "PNG"]}
                            maxFileSize={512000000}
                            fileAccept="*/*"
                            fileAddedMessage="Started!"
                            completedMessage="Complete!"
                            service={config.resumableService}
                            disableDragAndDrop={true}
                            onFileSuccess={(file, message) => {
                                this.addImage(file);
                            }}
                            onFileAdded={(file, resumable) => {
                                resumable.upload();
                            }}
                            onFileRemoved={(file) => {
																this.removeImage(file);
                            }}
                            onMaxFileSizeErrorCallback={(file, errorCount) => {
                                console.log('Error! Max file size reached: ', file);
                                console.log('errorCount: ', errorCount);
                            }}
														onUploadErrorCallback={(file, error) => {
															this.setState({
																message: {
																	status: 'danger',
																	text: error
																},
																error: true
															});
														}}
                            fileNameServer="file"
                            tmpDir={config.tmpDir}
                            maxFiles={15}
                        />

                        <div className="form-actions">
                            <button className="btn btn-primary form-submit" disabled={this.state.error || !Object.values(this.state.images).length} onClick={this.saveData}>Aceptar</button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}
