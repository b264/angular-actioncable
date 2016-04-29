'use strict';

describe('ActionCableSocketWrangler', function(){
  var ActionCableSocketWrangler,
      ActionCableWebsocket,
      resetWebsocketMock;

  resetWebsocketMock = function () {
    ActionCableWebsocket = {
      attempt_restart: function() {},
      on_connection_close_callback: function() {},
      on_connection_open_callback: function() {},
      close: function() {}
    };
  };

  beforeEach(module('ngActionCable'));

  beforeEach(function() {
    resetWebsocketMock();
    module(function($provide) { $provide.value('ActionCableWebsocket', ActionCableWebsocket); });
    module(function($provide) { $provide.value('ActionCableConfig', { autoStart: false }); });
  });

  beforeEach(inject(function(_ActionCableSocketWrangler_) {
    ActionCableSocketWrangler= _ActionCableSocketWrangler_;
  }));

  afterEach(function() {
    resetWebsocketMock();
  });

  describe('connected', function() {
    it('initiates to false', function(){
      expect(ActionCableSocketWrangler.connected).toBe(false);
    });

    describe('when starts with connection call back', function() {
      beforeEach(function() {
        ActionCableWebsocket.attempt_restart = function() {
          this.on_connection_open_callback();
        };
        ActionCableSocketWrangler.start();
      });

      it('returns true', function(){
        expect(ActionCableSocketWrangler.connected).toBe(true);
      });
    });

    describe('when starts without connection call back', function() {
      beforeEach(function() {
        ActionCableWebsocket.attempt_restart = function() {};
        ActionCableSocketWrangler.start();
      });

      it('returns false', function(){
        expect(ActionCableSocketWrangler.connected).toBe(false);
      });
    })
  });

  describe('connecting', function() {
    it('initiates to false', function(){
      expect(ActionCableSocketWrangler.connecting).toBe(false);
    });

    describe('when starts without connection call back', function() {
      beforeEach(function() {
        ActionCableWebsocket.attempt_restart = function() {};
        ActionCableSocketWrangler.start();
      });

      it('returns true', function(){
        expect(ActionCableSocketWrangler.connecting).toBe(true);
      });
    })
  });

  describe('disconnected', function() {
    it('initiates to true', function(){
      expect(ActionCableSocketWrangler.disconnected).toBe(true);
    });

    describe('when starts with connection call back', function() {
      beforeEach(function() {
        ActionCableWebsocket.attempt_restart = function() {
          this.on_connection_open_callback();
        };
        ActionCableSocketWrangler.start();
      });

      it('returns false', function(){
        expect(ActionCableSocketWrangler.disconnected).toBe(false);
      });
    });

    describe('when starts with connection call back and stop', function() {
      beforeEach(function() {
        ActionCableWebsocket.attempt_restart = function() {
          this.on_connection_open_callback();
        };
        ActionCableSocketWrangler.start();
        ActionCableSocketWrangler.stop();
      });

      it('returns true', function(){
        expect(ActionCableSocketWrangler.disconnected).toBe(true);
      });
    })
  });
});
