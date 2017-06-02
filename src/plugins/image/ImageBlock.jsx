/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons as icons} from "megadraft";
import ImageBlockStyle from "./ImageBlockStyle";


export default class ImageBlock extends Component {
    constructor(props) {
        super(props);

        this._handleCaptionChange = ::this._handleCaptionChange;

        this.actions = [
            {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
        ];
    }

    _handleCaptionChange(event) {
        event.stopPropagation();

        const payload = {
        		caption: event.target.value
        };

        this.props.updateData ?
						this.props.updateData(payload) :
        		this.props.container.updateData(payload);
    }

    render() {
        return (
            <MegadraftPlugin.CommonBlock {...this.props} actions={this.actions}>
                <MegadraftPlugin.BlockContent>
                    <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
                </MegadraftPlugin.BlockContent>

                <MegadraftPlugin.BlockData>
                    <MegadraftPlugin.BlockInput
                        placeholder="Escribí un epígrafe..."
                        value={this.props.data.caption}
                        onChange={this._handleCaptionChange} />
                </MegadraftPlugin.BlockData>
            </MegadraftPlugin.CommonBlock>
        );
    }
}
