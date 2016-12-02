import { expect } from 'chai';
import sinon from 'sinon';
import AndGateEmitter from '../../../src/events/gates/AndGateEmitter';
/*
Problem: I've got multiple async processes that when they're all complete,
should invoke a final process. Given the layout of the code, using Async
is not viable.

Solution: Create a custom event emitter that can server as a stateful AND
gate. It should be able to receive events and when all inputs are complete it
should invoke a function.
*/
describe('AndGateEmitter', () => {
  const andGate = new AndGateEmitter();

  afterEach(() => {
    andGate.reset();
  });

  it ('should set inputs when events are fired', () => {
    expect(andGate.state()).to.equal(0);
    andGate.emit('inputA');
    expect(andGate.state()).to.equal(1);
    andGate.emit('inputB');
    expect(andGate.state()).to.equal(2);
  });

  it ('should invoke a callback on gate-tripped when all inputs are done.', () => {
    expect(andGate.state()).to.equal(0);
    let trap = sinon.spy();
    andGate.on('gate-tripped', trap);
    andGate.emit('inputA');
    andGate.emit('inputB');
    //So far this seems fast enough, but we might need to find a better
    //way to test this.
    expect(trap.calledOnce).to.equal(true);
  });

  it ('should trip inputA', () => {
    expect(andGate.state()).to.equal(0);
    andGate.emit('inputA');
    expect(andGate.state()).to.equal(1);
    expect(andGate.inputATripped()).to.equal(true);
  });

  it ('should trip inputB', () => {
    expect(andGate.state()).to.equal(0);
    andGate.emit('inputB');
    expect(andGate.state()).to.equal(1);
    expect(andGate.inputBTripped()).to.equal(true);
  });
});
