import React from 'react';
import ReactDOM from 'react-dom';

import Factory from './components/SmokeEditorFactory';
import DomUtils from "./Helpers/DomUtils";
import './sass/index.scss';


let SmokeEditorFactoryWrapper = {
	make: (elementId, config) => {
		const element = document.getElementById(elementId);
		const container = DomUtils.wrap(element);

		ReactDOM.render(
			Factory.make(element, config),
			container
		);
	}
};


module.exports = SmokeEditorFactoryWrapper;
