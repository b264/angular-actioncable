// ngActionCableSocketWrangler to start, stop or try reconnect websockets if they die.
//
// Current status is denoted by three booleans:
// connected(), connecting(), and disconnected(), in an abstraction
// of the internal trivalent logic. Exactly one will be true at all times.
//
// Actions are start() and stop()
ngActionCable.factory("ActionCableSocketWrangler", function(ActionCableWebsocket, ActionCableConfig, ActionCableController) {
  var reconnectIntervalTime= 7537;
  var timeoutTime= 20143;
  var websocket= ActionCableWebsocket;
  var controller= ActionCableController;
  var _live= false;
  var _connecting= false;
  var _reconnectTimeout= false;
  var is_live= false;
  var is_reconnecting= false;
  var is_stopped= true;
  var setReconnectTimeout= function(){
    stopReconnectTimeout();
    _reconnectTimeout = _reconnectTimeout || setTimeout(function(){
      if (ActionCableConfig.debug) console.log("ActionCable connection might be dead; no pings received recently");
      connection_dead();
    }, timeoutTime + Math.floor(Math.random() * timeoutTime / 5));
  };
  var stopReconnectTimeout= function(){
    clearTimeout(_reconnectTimeout);
    _reconnectTimeout= false;
  };
  controller.after_ping_callback= function(){
    setReconnectTimeout();
  };
  var connectNow= function(){
    websocket.attempt_restart();
    setReconnectTimeout();
  };
  var startReconnectInterval= function(){
    _connecting= _connecting || setInterval(function(){
      connectNow();
    }, reconnectIntervalTime + Math.floor(Math.random() * reconnectIntervalTime / 5));
    update_state();
  };
  var stopReconnectInterval= function(){
    clearInterval(_connecting);
    _connecting= false;
    update_state();
    clearTimeout(_reconnectTimeout);
    _reconnectTimeout= false;
  };
  var connection_dead= function(){
    if (_live) { startReconnectInterval(); }
    if (ActionCableConfig.debug) console.log("connection close");
  };
  websocket.on_connection_close_callback= connection_dead;
  var connection_alive= function(){
    stopReconnectInterval();
    if (ActionCableConfig.debug) console.log("connection open");
  };
  websocket.on_connection_open_callback= connection_alive;
  var update_state= function(){
    is_live= (_live && !_connecting);
    is_reconnecting= (_live && !!_connecting);
    is_stopped= !_live;
  };
  var methods= {
    connected: function(){
      console.log("ActionCableSocketWrangler.connected() is deprecated and will be removed in version 1.0 -- Use ActionCableSocketWrangler.live");
      return (_live && !_connecting);
    },
    connecting: function(){
      console.log("ActionCableSocketWrangler.connecting() is deprecated and will be removed in version 1.0 -- Use ActionCableSocketWrangler.reconnecting");
      return (_live && !!_connecting);
    },
    disconnected: function(){
      console.log("ActionCableSocketWrangler.disconnected() is deprecated and will be removed in version 1.0 -- Use ActionCableSocketWrangler.stopped");
      return !_live;
    },
    live: is_live,
    reconnecting: is_reconnecting,
    stopped: is_stopped,
    start: function(){
      if (ActionCableConfig.debug) console.info("Live STARTED");
      _live= true;
      update_state();
      startReconnectInterval();
      setReconnectTimeout();
      connectNow();
    },
    stop: function(){
      if (ActionCableConfig.debug) console.info("Live stopped");
      _live= false;
      update_state();
      stopReconnectInterval();
      stopReconnectTimeout();
      websocket.close();
    }
  };
  return methods;
});
