import React, { Component } from 'react';
import UserArticleImagesSelector from './UserArticleImagesSelector';
import UserArticleVideosSelector from './UserArticleVideosSelector';

/**
 * Stateless factory component for a UserArticle media selection
 */
export default props => {
		const { images, videos } = props.userArticle;

		if (images && images.length) {
				return <UserArticleImagesSelector selectMedia={props.selectMedia} images={images} />;
		}

		if (videos && videos.length) {
				return <UserArticleVideosSelector selectMedia={props.selectMedia} videos={videos} />;
		}

		throw new Error('Can\'t create media selector for user article!');
}
