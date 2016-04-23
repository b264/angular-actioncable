'use strict';

describe('ActionCableWebsocket', function(){
  var ActionCableWebsocket;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableWebsocket_) {
    ActionCableWebsocket= _ActionCableWebsocket_;
  }));
  it("exists", function() {
    expect(ActionCableWebsocket).toBeTruthy;
  });
});
