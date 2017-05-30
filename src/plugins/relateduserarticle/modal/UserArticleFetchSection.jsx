import React, { Component } from 'react';
import { extractArticleIdFromInput } from '../utils';

const LABEL_BTN_STATUS_FETCHING = 'Buscando...';
const LABEL_BTN_STATUS_IDLE = 'Buscar';

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

	render() {
		return (
			<div className="">
				<div className="form-inline">
					<input onChange={this.onChange}
								 disabled={this.props.isFetching}
								 className="form-control"
								 ref={(ref) => this.input = ref} />
					&nbsp;
					<button onClick={this.props.onClick}
									disabled={!this.state.isValid || this.props.isFetching}
									className="btn btn-primary">
						{ this.props.isFetching ? LABEL_BTN_STATUS_FETCHING : LABEL_BTN_STATUS_IDLE }
					</button>
				</div>
			</div>
		);
	}

}
