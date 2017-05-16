import React from 'react';
import Smoke from './Smoke';
import PluginManager from '../Helpers/PluginManager';

export default class SmokeEditorFactory {

	static make({config, attributes}) {
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
			plugins: plugins,
			actions: actions,
			id: attributes.id,
			name: attributes.name,
			defaultValue: attributes.value
		};

		return <Smoke {...componentProps} />;
	}

}
