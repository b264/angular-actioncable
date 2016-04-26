'use strict';

describe('ActionCableSocketWrangler', function(){
  var ActionCableSocketWrangler;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableSocketWrangler_) {
    ActionCableSocketWrangler= _ActionCableSocketWrangler_;
  }));
  it('exists', function(){
    expect(ActionCableSocketWrangler).toBeObject;
  });
});
