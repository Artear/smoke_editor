import React, {Component} from 'react';
import { Modifier, EditorState, convertToRaw, RichUtils, SelectionState } from 'draft-js';
import ImageBlock from '../image/ImageBlock';
import RelatedUserArticleVideoBlock from './RelatedUserArticleVideoBlock';

/**
 * Related UserArticle block for the editor.
 * If the article has an image, it will be shown.
 * Otherwise, if it contains a video, a placeholder will be displayed.
 */
export default class RelatedUserArticleBlock extends Component {

		updateData = (payload) => {
			  if ('caption' in payload) {
			  	 	let caption = payload.caption;
						payload = {
								...this.props.data
						};
						payload.article.media.caption = caption;
				}

				this.props.container.updateData(payload);
		};

    render() {
				const article = this.props.data.article;
        let media = article.media;

        if (!media) {
					// If there is no media field, the format corresponds to the v0 version
					// that uses 'image' and 'kaltura_id' fields under article

					if (article.image) {
						media = {
							type: 'image',
							src: article.image,
							caption: article.caption
						};
					} else {
						media = {
							type: 'genoa',
							data: {
								genoa_id: article.genoa_id,
								genoa_player_id: article.genoa_player_id,
							}
						};
					}
				}

        const isImage = media.type === 'image';

        return (
            <div className="plugin-relateduserarticle-block" style={{position: 'relative'}}>
                <div className="plugin-relateduserarticle-block__indicator">
                    { isImage ? 'Imagen' : 'Video' } de nota de TN y la Gente (#{ article.nid })
                </div>
                {
										isImage ?
												<ImageBlock {...this.props} updateData={this.updateData} data={media} /> :
                        <RelatedUserArticleVideoBlock {...this.props} />
                }
            </div>
        );
    }
}
