'use strict';

describe('ActionCableController', function(){
  var ActionCableController;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableController_) {
    ActionCableController= _ActionCableController_;
  }));
  it("exists", function() {
    expect(ActionCableController).toBeTruthy;
  });
});
