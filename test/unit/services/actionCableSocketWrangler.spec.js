'use strict';

describe('ActionCableSocketWrangler', function(){
  var ActionCableSocketWrangler;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableSocketWrangler_) {
    ActionCableSocketWrangler= _ActionCableSocketWrangler_;
  }));
  it("exists", function() {
    expect(ActionCableSocketWrangler).toBeTruthy;
  });
  it("says Hello to me", function() {
    expect(ActionCableSocketWrangler.getGreeting("Dave")).toEqual("Hello Dave");
  });
});
