import React, { Component } from 'react';
import { extractArticleIdFromInput } from '../utils';

const LABEL_BTN_SELECT = 'Seleccionar';

export default class UserArticleImagesSelector extends Component {

	select = () => {
	};

	render() {
		return (
				<div>
						{
								this.state.userArticle.images.map(image => {
										return <img src={image.url} />;
								})
						}
				</div>
		);
	}

}
