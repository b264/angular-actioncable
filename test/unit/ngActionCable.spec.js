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
  describe('dependent', function(){
    var mySampleApp;
    beforeEach(function(){
      mySampleApp= angular.module('mySampleApp', ['ngActionCable']);
      mySampleApp.hasModule= function(module) {
        return mySampleApp.requires.indexOf(module) >= 0;
      };
    });
    it('ngActionCable loaded', function(){
      expect(mySampleApp.hasModule('ngActionCable')).toBeTruthy;
    });
  });
});
