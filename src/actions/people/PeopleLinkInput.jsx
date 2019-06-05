import React from "react";
import config from "./config";
import { cleanString } from '../../Helpers/pathutils';

export default class PeopleLinkInput extends React.Component {
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
      if (this.props.entityType === "PEOPLE_LINK") {
        return true;
      }
    }
    return false;
  }

  set = () => {
    const editorState = this.props.editorState;

    const selection = editorState.getSelection();
    const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
    const personText = contentBlock.getText().slice(selection.getStartOffset(), selection.getEndOffset());
    this.props.setEntity({"type": "people", url: config.url + cleanString(personText)}, "INMUTABLE");
    this.props.cancelEntity();
  }

  remove = () => {
    this.props.removeEntity();
  }

  render = () => {
    return null;
  }


}