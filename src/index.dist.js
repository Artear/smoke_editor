import React from 'react';
import ReactDOM from 'react-dom';

import Factory from './components/SmokeEditorFactory';
import './sass/index.scss';


let SmokeEditorFactoryWrapper = {
	make: (elementId, { config, attributes }) => {
		ReactDOM.render(
			Factory.make({ config, attributes }),
			document.getElementById(elementId)
		);
	}
};


module.exports = SmokeEditorFactoryWrapper;
