import React from 'react';
import {insertDataBlock} from "megadraft";
import ReactResumableJs from 'react-resumable-js'
import axios from 'axios';
import config from "./config";
import Modal from "react-responsive-modal";
import ImageBlockStyle from "./ImageBlockStyle";

const INITIAL_MESSAGE = {
	status: 'info',
	text: 'Seleccioná una o varias imágenes (máximo 15)'
};

export default class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: INITIAL_MESSAGE,
            resumableHeaders: {},
						error: false, /* TODO - convertirlo a arreglo y manejarlo con AddErrors() */
						images: {},
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

    // addError(file, message) {... } TODO - Poder agragar errores al arreglo del State y rearmar el Dom Virtual para que informe al usuario

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
					error: false
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

				// TODO - Si state.errors no esta vacio -> concatenar todos los mensajes y

        return <div className="modal-wrapper">
						<Modal open={this.props.isShowingModal}
									 onClose={this.handleClose}
									 styles={ImageBlockStyle.modal}
									 closeOnOverlayClick={false}
						>
									<h3>{this.state.message.text}</h3> /* Mostrar el listado de errores en el caso que haberlos */
									<ReactResumableJs
											headerObject={this.state.resumableHeaders}
											uploaderID="image-upload"
											dropTargetID="myDropTarget"
											filetypes={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]} // Agregado tipos de extensiones "jpeg".
											maxFileSize={5242880} // Maximo 5 megas de tamaño de archivo, validado localmente.
											fileAccept="image/jpeg, image/png" // El manejador de archivos del lado del cliente solo muestre imagenes de ese tipo, se puede alterar a "Mostrar todos" pero igual captura el error el cliente.
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
													// TODO - Capturar error y agragarlo con AddError()
													console.log('Error! Max file size reached: ', file);
													console.log('errorCount: ', errorCount);
											}}
											onUploadErrorCallback={(file, error) => {
												// TODO - Capturar error y agragarlo con AddError()
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
											// Errores del lado del cliente, no son manejados por le callback
											// onFileAddedError(file, errorCount) {
											// 									addError()
											// }
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
