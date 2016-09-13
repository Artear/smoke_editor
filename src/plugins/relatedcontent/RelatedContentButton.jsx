import React, {Component} from "react";
import icons from "../../icons/icons";
import {insertDataBlock} from "megadraft";
import {Modifier, EditorState} from "draft-js";

export default class RelatedContentButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = ::this.onClick;
    }

    onClick(e) {
        e.preventDefault();
        const data = { type: "relatedcontent", dataType:"relatedcontent", data: { title: "", href: "" }};
        this.props.onChange(insertDataBlock(this.props.editorState, data)); 

    }


    render() {

        return (
                <div>
                    <button className={this.props.className} type="button" onClick={this.onClick} >
                        <icons.RelatedContentIcon className="sidemenu__button__icon"/>
                    </button>
                </div>
        );
    }
}
