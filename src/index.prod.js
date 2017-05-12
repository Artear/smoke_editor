import React from 'react';
import ReactDOM from 'react-dom';

import './sass/index.scss';
import Factory from './SmokeEditorFactory';


function renderEditor(elementId, { config, attributes }) {
	ReactDOM.render(
		Factory.make({ config, attributes }),
		document.getElementById(elementId)
	);
}

window.SmokeEditorFactory = renderEditor;

export default renderEditor;
