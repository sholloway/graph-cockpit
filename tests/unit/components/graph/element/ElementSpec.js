global['Electron'] = require('electron');
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Element from '../../../../../src/components/graph/element/Element';

Element.__Rewire__('ElementContextMenu', React.createClass({
    render: function() { return <div></div>; },
    componentWillMount: function(){}
}));

describe('<Element />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Element.prototype, 'componentDidMount');
    const wrapper = mount(<Element />);
    console.log(Element);
    expect(Element.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
