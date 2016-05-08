'use strict';

describe('ActionCableConfig', function(){
  var ActionCableConfig;//,
  var element_spy, attr_spy;
      //ngElementFake;
  var init= function(){
    beforeEach(module('ngActionCable'));
    beforeEach(inject(function(_ActionCableConfig_){
      ActionCableConfig= _ActionCableConfig_;
    }));
  };

  describe('before init', function(){
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
      //beforeEach(function(){
        //var element= {
          //attr: null
        //};
        //var attr= 'foooddf'; //{
          ////content: 'foo'
        ////};
        //spyOn(angular, 'element').and.returnValue(element);
        //spyOn(element, 'attr').and.returnValue(attr);

        //inject(function(_ActionCableConfig_){
          //ActionCableConfig= _ActionCableConfig_;
        //});
        //expect(angular.element).toHaveBeenCalledWith("meta[name='action-cable-url']");
        //expect(element.attr).toHaveBeenCalledWith("content");
      //});

      describe('when meta tag set', function() {
        //beforeEach(function() {
          //angular.module('fakeRootElement', []).value('$rootElement', angular.element('<meta name="action-cable-url" content="ws://localhost:3000/cable"/>'));
          //inject(function($compile, $rootScope) {
          //  var element = $compile('<meta name="action-cable-url" content="ws://localhost:3000/cable"/>')($rootScope);
            //expect(element.text()).toEqual('');
          //});
          //inject(function(_ActionCableConfig_){
          //  ActionCableConfig= _ActionCableConfig_;
          //})
        //});
        //init();
        it('returns meta value', function(){
          expect(ActionCableConfig.wsUri).toBe('wss://foobar.tld:1234/path/name');
        });
      });

      describe('when meta tag not found', function() {
        //beforeEach(function() {
          //angular.module('fakeRootElement', []).value('$rootElement', angular.element('<html></html>'));
          //inject(function(_ActionCableConfig_){
          //  ActionCableConfig= _ActionCableConfig_;
          //})
        //});
        var element, attr;
        beforeEach(function(){
          element= {
            attr: null,
            data: function(){}
          };
          attr= 'foooddf'; //{
            //content: 'foo'
          //};
          element_spy= spyOn(angular, 'element').and.returnValue(element);
          attr_spy= spyOn(element, 'attr').and.returnValue(attr);

          //inject(function(_ActionCableConfig_){
          //  ActionCableConfig= _ActionCableConfig_;
          //});
          init();
          //inject(function(_ActionCableConfig_){
           // ActionCableConfig= _ActionCableConfig_;
          //});
          expect(angular.element).toHaveBeenCalledWith("meta[name='action-cable-url']");
          expect(element.attr).toHaveBeenCalledWith("content");
        });
        afterEach(function(){
          element_spy.andCallThrough();
          attr_spy.andCallThrough();
        });
        it('returns empty', function(){
          expect(ActionCableConfig.wsUri).toBe('foobarz');
        });
      });




    });
  });

  describe('after init', function(){
    //beforeEach(module('ngActionCable'));
    //beforeEach(inject(function(_ActionCableConfig_){
    //  ActionCableConfig= _ActionCableConfig_;
    //}));
    init();
  //  beforeEach(function(){
  //    module(function($provide) { $provide.value('$rootElement', angular.element('<div></div>')); });
  //  });
    describe('module', function(){
      //beforeEach(inject(function(_ActionCableConfig_){
      //  ActionCableConfig= _ActionCableConfig_;
      //}));
      it('exists', function(){
        expect(ActionCableConfig).toBeObject;
      });
    });
    describe('autoStart', function() {
      //beforeEach(inject(function(_ActionCableConfig_){
      //  ActionCableConfig= _ActionCableConfig_;
      //}));
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
    describe('debug', function() {
      //beforeEach(inject(function(_ActionCableConfig_){
      //  ActionCableConfig= _ActionCableConfig_;
      //}));
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

});
