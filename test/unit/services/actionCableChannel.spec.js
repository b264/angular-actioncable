'use strict';

describe('ActionCableChannel', function(){
  var ActionCableChannel;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableChannel_) {
    ActionCableChannel= _ActionCableChannel_;
  }));
  it("exists", function() {
    expect(ActionCableChannel).toBeTruthy;
  });
});
