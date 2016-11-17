global['Electron'] = require('electron');
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Element from '../../../../../src/components/graph/element/Element';
import {ElementRenderStates} from '../../../../../src/constants/elementRenderStates';

Element.__Rewire__('ElementContextMenu', React.createClass({
    render: function() { return <div></div>; },
    componentWillMount: function(){}
}));

describe('<Element />', () => {
  let props;
  beforeEach(() => {
    props = {
      x: 25, y: 30,
      renderState: ElementRenderStates.IDLE,
      data: { id: 4 },
      displayContextMenu: false,
      moving: false,
      handleOnClick: (id) => {},
      handleOnRightClick: (id) => {},
      deleteSelectedItem: (id) => {},
      dragStart: (id, renderState, event) => {},
      drag: () => {},
      dragEnd: () => {}
    };
  });

  it('should mount the component', () => {
    sinon.spy(Element.prototype, 'componentDidMount');
    const wrapper = mount(<Element {...props}/>);
    expect(Element.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should respond to clicks', () => {
    props.handleOnClick = sinon.spy();
    const wrapper = mount(<Element {...props}/>);
    wrapper.find('rect').simulate('click');
    expect(props.handleOnClick.calledOnce).to.equal(true);
  });

  it('should respond to mouse down', () => {
    props.dragStart = sinon.spy();
    const wrapper = mount(<Element {...props}/>);
    wrapper.find('rect').simulate('mouseDown');
    expect(props.dragStart.calledOnce).to.equal(true);
  });

  it('should respond to mouse up', () => {
    props.dragEnd = sinon.spy();
    const wrapper = mount(<Element {...props}/>);
    wrapper.find('rect').simulate('mouseUp');
    expect(props.dragEnd.calledOnce).to.equal(true);
  });

  it('should trigger context menu on right click if selected', () => {
    props.renderState = ElementRenderStates.SELECTED;
    props.handleOnRightClick = sinon.spy();
    const wrapper = mount(<Element {...props}/>);
    wrapper.find('rect').simulate('contextMenu');
    expect(props.handleOnRightClick.calledOnce).to.equal(true);
  });

  it('should not trigger context menu on right click if not selected', () => {
    props.renderState = ElementRenderStates.IDLE;
    props.handleOnRightClick = sinon.spy();
    const wrapper = mount(<Element {...props}/>);
    wrapper.find('rect').simulate('contextMenu');
    expect(props.handleOnRightClick.callCount).to.equal(0);
  });
});
