'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig,
      spy,
      ngElementFake;
  beforeEach(module('ngActionCable'));
  beforeEach(inject(function(_ActionCableConfig_){
    ActionCableConfig= _ActionCableConfig_;
  }));
//  beforeEach(function(){
//    module(function($provide) { $provide.value('$rootElement', angular.element('<div></div>')); });
//  });
  it('exists', function(){
    expect(ActionCableConfig).toBeObject;
  });
  describe('autoStart', function() {
    it('initiates to true', function(){
      expect(ActionCableConfig.autoStart).toBe(true);
    });
    describe('when set false', function() {
      beforeEach(function() {
        ActionCableConfig.autoStart= false;
      });

      it('returns false', function(){
        expect(ActionCableConfig.autoStart).toBe(false);
      });
    });
  });
  describe('wsUri', function() {
    //it('initiates to true', function(){
      //expect(ActionCableConfig.wsUri).toBe(true);
    //});
    //beforeEach(function(){
      //angular.module('fakeRootElement', []).value('$rootElement', angular.element('<div></div>'));
      //module(function($provide) { $provide.value('$rootElement', angular.element('<div></div>')); });
      ////angular.module('fakeRootElement', []).value('$rootElement', angular.element('<div></div>'));
      //var initInjector = angular.injector(['ngActionCable', 'ActionCableConfig', 'fakeRootElement']);
      //var jqLite = angular.element;
      //var ngElementFake = function(el) {
        //return {
          //scope: function() {
            //return {
              //toggleChildElement: true,
              //field: scope.field
            //};
          //}
        //};
      //};
    //});
    describe('when meta tag not found', function() {
      beforeEach(function() {
        angular.module('fakeRootElement', []).value('$rootElement', angular.element('<html></html>'));
      });
      it('returns empty', function(){
        expect(ActionCableConfig.wsUri).toBe('');
      });
    });
    describe('when meta tag set', function() {
      beforeEach(function() {
        angular.module('fakeRootElement', []).value('$rootElement', angular.element('<html><head><meta name="action-cable-url" content="ws://localhost:3000/cable"/></head></html>'));
      });
      it('returns meta value', function(){
        expect(ActionCableConfig.wsUri).toBe('wss://foobar.tld:1234/path/name');
      });
    });
  });
  describe('debug', function() {
    it('initiates to false', function(){
      expect(ActionCableConfig.debug).toBe(false);
    });
    describe('when set true', function() {
      beforeEach(function() {
        ActionCableConfig.debug= true;
      });

      it('returns true', function(){
        expect(ActionCableConfig.debug).toBe(true);
      });
    });
  });
});
