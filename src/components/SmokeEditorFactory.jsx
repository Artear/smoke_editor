import React from 'react';
import Smoke from './Smoke';
import PluginManager from '../Helpers/PluginManager';
import DOMValidator from "../Helpers/DomValidator";

export default class SmokeEditorFactory {

	static make(element, config) {
		const id = DOMValidator.getAttributeOrThrow(element, 'id');
		const name = DOMValidator.getAttributeOrThrow(element, 'name');
		const defaultValue = element.value.trim();

		let plugins = [];
		config.plugins.forEach(function (pluginName) {
			plugins.push(PluginManager.get('plugin', pluginName));
		});

		let actions = [];
		config.actions.forEach(function (actionName) {
			actions.push(PluginManager.get('action', actionName));
		});

		let componentProps = {
			debug: config.debug,
			plugins,
			actions,
			id,
			name,
			defaultValue
		};

		return <Smoke {...componentProps} />;
	}

}
