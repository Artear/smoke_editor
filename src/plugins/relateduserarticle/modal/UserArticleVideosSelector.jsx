import React, { Component } from 'react';

/**
 * Videos selector component for a UserArticle
 * For ever entry it shows the video using a HTML5 <video> tag,
 * its Kaltura ID and the select button.
 */
export default class UserArticleVideoSelector extends Component {

	select = (video) => {
			this.props.selectMedia({
					type: 'video',
					...video
			});
	};

	render() {
			return (
					<div className="plugin-relateduserarticle-modal__videos-selector">
					{
						this.props.videos.map(video => {
								return (
										<div className="plugin-relateduserarticle-modal__videos-selector-entry" key={video.kaltura_id}>
												<span className="plugin-relateduserarticle-modal__videos-selector-entry-id">{video.kaltura_id}</span>
												<video preload="metadata" controls src={video.kaltura_url} />
												<button className="btn btn-default btn-block" onClick={() => this.select(video)}>
														<i className="glyphicon glyphicon glyphicon-facetime-video"></i> Seleccionar
												</button>
										</div>
								);
						})
					}
					</div>
			);
	}

}
