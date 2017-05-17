import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Factory from './components/SmokeEditorFactory';
import DomUtils from './Helpers/DomUtils';
import './sass/index.dev.scss';


const config = {
	plugins: ['EMBED', 'RELATEDCONTENT', 'IMAGE', 'RELATEDTAG', 'KALTURA', 'RELATEDUSERARTICLE'],
	actions: ['BOLD', 'ITALIC', 'LINK', 'SUBTITLE', 'BLOCKQUOTE', 'PEOPLE', 'TAG'],
	debug: true
};

const element = document.getElementById('my-editor');
DomUtils.wrap(element);

const render = () => {
	const editor = Factory.make(element, config);

	ReactDOM.render(
		<AppContainer>
			{editor}
		</AppContainer>,
		element.parentElement
	);
};

render();

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept();
}
