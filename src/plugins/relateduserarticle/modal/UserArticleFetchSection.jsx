import React, { Component } from 'react';
import { extractArticleIdFromInput } from '../utils';

const LABEL_BTN_STATUS_FETCHING = 'Buscando...';
const LABEL_BTN_STATUS_IDLE = 'Buscar';

/**
 * Component that wraps the user article url/id input and the fetch button.
 * Validates the given value and enables/disabled fetching.
 */
export default class UserArticleFetchSection extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isValid: false
		};
	}

	onChange = () => {
		const isValid = extractArticleIdFromInput(this.input.value);

		this.setState({
			isValid
		});

		this.props.onChange();
	};

	onClick = () => {
		this.props.fetchUserArticle(this.input.value);
	};

	render() {
		return (
			<div className="">
				<div className="form-inline">
					<input onChange={this.onChange}
								 disabled={this.props.isFetching}
								 className="form-control"
								 ref={(ref) => this.input = ref} />
					&nbsp;
					<button onClick={this.onClick}
									disabled={!this.state.isValid || this.props.isFetching}
									className="btn btn-primary">
						{ this.props.isFetching ? LABEL_BTN_STATUS_FETCHING : LABEL_BTN_STATUS_IDLE }
					</button>
				</div>
			</div>
		);
	}

}
