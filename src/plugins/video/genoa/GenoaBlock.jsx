import React, {Component}   from "react";
import VideoBlock from "../common/VideoBlock";


export default class KalturaBlock extends Component {
	render() {
		return (
			<VideoBlock
				type={"genoa"}
				{...this.props}
			/>

		);
	}
}
