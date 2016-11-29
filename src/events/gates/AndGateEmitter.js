const EventEmitter = require('events');

class AndGateEmitter extends EventEmitter{
  constructor(){
    super();
    this.inputA = 0;
    this.inputB = 0;

    this.on('inputA', function(){
      this.inputA = 1;
      this.emit('gate-changed');
    })
    .on('inputB', function(){
      this.inputB = 1;
      this.emit('gate-changed');
    })
    .on('gate-changed', function(){
      if (this.state() == 2){
        this.emit('gate-tripped');
      }
    });
  }

  state(){
    return this.inputA + this.inputB;
  }

  reset(){
    this.inputA = 0;
    this.inputB = 0;
  }
}

export default AndGateEmitter;
