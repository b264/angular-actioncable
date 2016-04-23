'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableConfig_) {
    ActionCableConfig= _ActionCableConfig_;
  }));
  it("exists", function() {
    expect(ActionCableConfig).toBeTruthy;
  });
});
