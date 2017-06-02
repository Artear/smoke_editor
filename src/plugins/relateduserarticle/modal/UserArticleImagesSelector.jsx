import React, { Component } from 'react';

/**
 * Images selector component for a UserArticle
 * For ever entry it shows the image and its select button.
 */
export default class UserArticleImagesSelector extends Component {

	select = (image) => {
			// Updated media Draft data must currently match with
			// the one given by the ImageBlock, plus the image fid
			this.props.selectMedia({
					type: 'image',
					dataType: 'image',
					src: image.url,
					fid: image.fid
			});
	};

	render() {
			return (
					<div className="plugin-relateduserarticle-modal__images-selector">
					{
							this.props.images.map(image => {
									return (
											<div className="plugin-relateduserarticle-modal__images-selector-entry" key={image.fid}>
													<img src={image.url} />
													<button className="btn btn-default btn-block" onClick={() => this.select(image)}>
															<i className="glyphicon glyphicon glyphicon-picture"></i> Seleccionar
													</button>
											</div>
									);
							})
					}
					</div>
			);
	}

}
