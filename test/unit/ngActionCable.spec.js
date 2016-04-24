'use strict';

describe('ngActionCable', function(){
  it('exists', function() {
    expect(ngActionCable).toBeTruthy;
  });
  describe('dependency', function(){
    beforeEach(function(){
      ngActionCable.hasModule= function(module) {
        return ngActionCable.requires.indexOf(module) >= 0;
      };
    });
    it('loads ngWebSocket', function() {
      expect(ngActionCable.hasModule('ngWebSocket')).toBeTruthy;
    });
  });
});
