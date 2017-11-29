import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import DomUtils from './Helpers/DomUtils';
import './sass/index.dev.scss';

const config = {
	plugins: ['EMBED', 'RELATEDCONTENT', 'IMAGE', 'RELATEDTAG', 'KALTURA', 'GENOA', 'RELATEDUSERARTICLE'],
	actions: ['BOLD', 'ITALIC', 'LINK', 'SUBTITLE', 'BLOCKQUOTE', 'PEOPLE', 'TAG'],
	debug: true
};

// Wrap the editor element and keep the reference to its container
const reactRoot = DomUtils.wrap(document.getElementById('my-editor'));

const render = (Factory) => {
	// Create the editor component using the given Factory
	const editor = Factory.make(document.getElementById('my-editor'), config);

	ReactDOM.render(
		<AppContainer>
			{editor}
		</AppContainer>,
		reactRoot
	);
};

render(require('./components/SmokeEditorFactory.jsx').default);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/SmokeEditorFactory.jsx', () => {
		// Render again using loading the updated component hierarchy
		render(require('./components/SmokeEditorFactory.jsx').default);
	});
}
