import React, {Component}   from "react";
import {DraftJS} 						from "megadraft";
import {MegadraftPlugin}    from "megadraft";
import Autosuggest          from 'react-autosuggest';
import Immutable            from "immutable";
import axios                from 'axios';
import config               from "./config";
import icons                from "../../icons/icons";

const {Map} = Immutable;
const {Modifier, EditorState, SelectionState} = DraftJS;

export default class VideoBlock extends Component{
	constructor(props) {
		super(props);

		this.actions = [
			{"key": "edit", "icon": icons.EditIcon, "action": this.handleEdit},
			{"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
		];

		this.state = {
			isEditing:      !(this.props.data.data.title),
			title:          (this.props.data.data.title     || ''),
			nid:            (this.props.data.data.nid       || ''),
			suggestions:    []
		};
	}

	getSuggestions = (value) => {

		this.setState({
			loading: true,
		});

		const inputValue = value.trim().toLowerCase();
		return axios.get(config.videoSuggest + inputValue);

	}

	renderSuggestion = (suggestion) => {
		return (
			<span>{suggestion.title}</span>
		);
	}

	getSuggestionValue = (suggestion) => {
		return suggestion.title;
	}

	handleChange = (event, { newValue }) => {
		this.setState({
			title: newValue,
		});
	}

	handleEdit = (e) => {
		this.setState({
			isEditing: true
		});
	}

	onSuggestionsFetchRequested = ({ value }) => {
		this.getSuggestions(value)
			.then(function (response) {
				this.setState({
					suggestions:    response.data,
					loading:        false
				});
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {

		// @todo: create a function called "updateBlockData" that can be reused for any plugin
		const editorState       = this.props.blockProps.editorState;
		const contentState      = editorState.getCurrentContent();
		const newData           = {
			type: "video",
			dataType: "video",
			data: {
				title: suggestion.title,
				nid: suggestion.nid,
				kalturaid: suggestion.kalturaid,
				genoaid: suggestion.genoaid
			}
		};
		const targetSelection   = SelectionState.createEmpty(this.props.container.props.block.get('key'));
		const newContentState   = Modifier.mergeBlockData(contentState, targetSelection, Map(newData));

		this.props.blockProps.onChange(EditorState.push(
			editorState,
			newContentState,
			'change-block-data'
		));

		this.setState({
			nid:        suggestion.nid,
			title:      suggestion.title,
			isEditing:  false
		});
	};

	render() {

		const inputProps = {
			placeholder:    'Tipeá para buscar Video...',
			value:          this.state.title,
			onChange:       this.handleChange,
			style:          {display:"inline"}
		};

		return (
			<div className="video-block" style={{position: 'relative'}}>
				<div>
					<MegadraftPlugin.CommonBlock {...this.props} actions={this.actions}>

						<div className="links-related" style={{display:(this.state.isEditing) ? 'block' : 'none'}}>
							<Autosuggest
								suggestions={this.state.suggestions}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.onSuggestionsClearRequested}
								onSuggestionSelected={this.onSuggestionSelected}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={this.renderSuggestion}
								focusInputOnSuggestionClick={false}
								focusFirstSuggestion={true}
								inputProps={inputProps}
							/>
						</div>

						<div style={{display:(this.state.isEditing) ? 'none' : 'block'}} className={"smoke-block smoke-video"} />
					</MegadraftPlugin.CommonBlock>
				</div>


			</div>
		);
	}
}
