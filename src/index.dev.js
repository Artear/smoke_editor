import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './sass/index.dev.scss';
import Factory from './SmokeEditorFactory';


const config = {
	plugins: ['EMBED', 'RELATEDCONTENT', 'IMAGE', 'RELATEDTAG', 'KALTURA', 'RELATEDUSERARTICLE'],
	actions: ['BOLD', 'ITALIC', 'LINK', 'SUBTITLE', 'BLOCKQUOTE', 'PEOPLE', 'TAG'],
	debug: true
};

const attributes = {
	id: 'smoke-editor-id',
	name: 'smoke-editor-name',
	value: ''
};

const render = () => {
	const editor = Factory.make({ config, attributes });

	ReactDOM.render(
		<AppContainer>
			{editor}
		</AppContainer>,
		document.getElementById('editor')
	);
};

render();

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept();
}
