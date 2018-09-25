import React, { Component } from 'react';

/**
 * Videos selector component for a UserArticle
 * For ever entry it shows the video using a HTML5 <video> tag,
 * its Kaltura ID and the select button.
 */
export default class UserArticleVideoSelector extends Component {

	select = (video) => {
			// Updated media Draft data must currently match with
			// the one given by the KalturaBlock
			this.props.selectMedia({
					type: 'genoa',
					dataType: 'genoa',
					data: {
						genoa_id: video.genoa_id,
						genoa_player_id: video.genoa_player_id,
						title: ''
					}
			});
	};

	render() {
			return (
					<div className="plugin-relateduserarticle-modal__videos-selector">
					{
							this.props.videos.map(video => {
									return (
											<div className="plugin-relateduserarticle-modal__videos-selector-entry" key={video.genoa_id}>
													<span className="plugin-relateduserarticle-modal__videos-selector-entry-id">{video.genoa_id}</span>
													<iframe src={'https://api.vodgc.net/player/v2/embed/playerId/'+ video.genoa_player_id+'/contentId/'+video.genoa_id} />
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
