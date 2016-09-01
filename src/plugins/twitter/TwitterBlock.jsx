import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons as icons} from "megadraft";


export default class TwitterBlock extends Component {
    constructor(props) {
        super(props);
        this.actions = [
            {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
            {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
        ];
    }

    _handleEdit() {
    }

    _handleCaptionChange = (event) => {
        this.props.container.updateData({caption: event.target.value});
    }

    render() {
        return (
            <MegadraftPlugin.CommonBlock {...this.props} actions={this.actions}>
                {this.props.data.content}
            </MegadraftPlugin.CommonBlock>
        );
    }
}