import React from "react";
import {Modifier, EditorState, Entity} from 'draft-js';
import config from "./config";

export default class TagLinkInput extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount = () => {
    this.toggle();
  }

  toggle = () => {
    if (this.has()) {
      this.remove();
    } else {
      this.set();
    }
  }

  has = () => {
    if (this.props.entity) {
      if (this.props.entityType === "TAG_LINK") {
        return true;
      }
    }
    return false;
  }

  set = () => {
    const editorState = this.props.editorState;

    const selection = editorState.getSelection();
    const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
    const tag = contentBlock.getText().slice(selection.getStartOffset(), selection.getEndOffset()).trim().replace(/\s+/g, '-').toLowerCase();
    this.props.setEntity({"type": "tag", url: config.url + tag});
    this.props.cancelEntity();
  }

  remove = () => {
    this.props.removeEntity();
  }

  render = () => {
    return null;
  }


}