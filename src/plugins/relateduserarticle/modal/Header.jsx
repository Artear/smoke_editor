import React, { Component } from 'react';

export default props => {
	if (!props) {
		return null;
	}

	return (
		<div>
			<p className="modal-dialog-header">
				Inserte URL o ID de la nota de TN y la Gente
			</p>
			{
				props.error &&
				<div className="alert alert-danger">
					<i className="glyphicon glyphicon-exclamation-sign"></i>
					Error: {props.error}
				</div>
			}
		</div>
	);
}
