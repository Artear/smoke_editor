/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import ImageBlock from "../../../src/plugins/image/ImageBlock";
import icons from "../../../src/icons/icons";


let expect = chai.expect;


describe("ImageBlock", function() {
  beforeEach(function() {
    this.data = {
      caption: "media caption"
    };

    this.setReadOnly = sinon.spy();
    this.updateData = sinon.spy();
    this.remove = sinon.spy();

    const displayOptions = [
      {key: "small", icon: icons.MediaSmallIcon, label: "SMALL"},
      {key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM"}
    ];
    const defaultDisplay = "medium";
    const blockProps = {plugin: {options: {displayOptions, defaultDisplay}}};

    this.wrapper = mount(
      <ImageBlock container={this} blockProps={blockProps} data={this.data} />
    );

    this.caption = this.wrapper.find("input").at(0);
  });

  it("renders caption from data", function() {
    expect(this.caption.get(0).value).to.be.equal(this.data.caption);
  });

  it("updates entity on caption change", function () {
    this.caption.get(0).value = "new caption";
    this.caption.simulate("change");
    expect(this.updateData.calledWith({caption: "new caption"})).to.be.true;
  });
});
