/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import EmbedBlock from "../../../src/plugins/embed/EmbedBlock";
import icons from "../../../src/icons/icons";


let expect = chai.expect;


describe("EmbedBlock", function() {
  beforeEach(function() {
    this.data = {
      dataType: "instagram"
    };

    this.setReadOnly = sinon.spy();
    this.updateData = sinon.spy();
    this.remove = sinon.spy();

		const blockProps = {plugin: {options: {}}};
    this.wrapper = mount(
			<EmbedBlock container={this} blockProps={blockProps} data={this.data} />
    );

    this.placeholder = this.wrapper.find(".smoke-block");
  });

  it("renders placeholder from data", function() {
    expect(this.placeholder.hasClass('smoke-instagram')).to.equal(true);
  });
});
