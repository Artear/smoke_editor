import React, {Component} from 'react';
import { Modifier, EditorState, convertToRaw, RichUtils, SelectionState } from 'draft-js';
import ImageBlock from '../image/ImageBlock';
import RelatedUserArticleVideo from './RelatedUserArticleVideo';

/**
 * Related UserArticle block for the editor.
 * If the article has an image, it will be shown.
 * Otherwise, if it contains a video, a placeholder will be displayed.
 */
export default class RelatedUserArticleBlock extends Component {

    render() {
        const data = this.props.data.data;
        const isImage = data.selectedMedia.type === 'image';

        return (
            <div className="plugin-relateduserarticle-block" style={{position: 'relative'}}>
                <div className="plugin-relateduserarticle-block__indicator">
                    { isImage ? 'Imagen' : 'Video' } de nota de TN y la Gente (#{ data.nid })
                </div>
                {
										isImage ?
                        <ImageBlock {...this.props} data={{src: data.selectedMedia.url}} /> :
                        <RelatedUserArticleVideo {...this.props} />
                }
            </div>
        );
    }
}
