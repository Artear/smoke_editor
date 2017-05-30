import React, { Component } from 'react';

export default props => {
		const { images, videos } = props.userArticle;

		if (images.length) {
				return <UserArticleImagesSelector images={images} />;
		}

		if (videos.length) {
				return <UserArticleVideosSelector videos={videos} />;
		}

		throw new Error('Can\'t create media selector for user article!');
}
