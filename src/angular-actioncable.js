// ActionCable formats:
// ! Indentifier for subscribe, unsubscribe and message must be the same.

// {
//   "command": "subscribe",
//   "identifier": JSON.stringify({"channel": "UpdatesChannel",  "data": "name"}),
// }
//  - will set params to ["identifier"]["data"]

// {
//   "command": "unsubscribe",
//   "identifier": JSON.stringify({"channel": "UpdatesChannel",  "data": "name"}),
// }
//  - will set params to ["identifier"]["data"]

// {
//   "command": "message",
//   "identifier": JSON.stringify({"channel": "UpdatesChannel",  "data": "name"}),
//   "data": JSON.stringify({"message": "bla bla", "action": "foobar"})
// }
//  - will call foobar(data)
//  - will set params to ["identifier"]["data"]
ngActionCable.factory("Websocket", function($websocket, WebsocketController, WebsocketConfig) {
  var wsUrl = WebsocketConfig.wsUri;
  var controller = WebsocketController;
  var dataStream = null;
  var methods;
  var connected = false;
  var currentChannels = [];
  var close_connection = function(){
    if (dataStream){
      dataStream.close({"force":true});
      dataStream = null;
      connected = false;
    };
  };
  var subscribe_to = function(channel, data){
    if (typeof(data)==='undefined') data = "N/A";
    console.log("-> subscribing to: " + channel)
    new_data_stream().send(JSON.stringify({
        "command": "subscribe",
        "identifier": JSON.stringify({"channel": channel, "data": data})
      }));
  };
  var unsubscribe_from = function(channel, data){
    if (typeof(data)==='undefined') data = "N/A";
    console.log("<- unsubscribing from: " + channel)
    new_data_stream().send(JSON.stringify({
        "command": "unsubscribe",
        "identifier": JSON.stringify({"channel": channel, "data": data})
      }));
  };
  var send_to = function(channel, data, message, action){
    if (typeof(data)==='undefined') data = "N/A";
    console.log("=> sending to: " + channel)
    new_data_stream().send(JSON.stringify({
        "command": "message",
        "identifier": JSON.stringify({"channel": channel, "data": data}),
        "data": JSON.stringify({"message": message, "action": action})
      }));
  };
  var new_data_stream = function(){
    if(dataStream == null) {
      dataStream = $websocket(wsUrl);
      dataStream.onClose(function(arg){
        close_connection();
        connected = false;
        methods.on_connection_close_callback();
      });
      dataStream.onOpen(function(arg){
        connected = true;
        currentChannels.forEach(function(channel){ subscribe_to(channel.name, channel.data); });
        methods.on_connection_open_callback();
      });
      dataStream.onMessage(function(message) {   //arriving message from backend
        controller.post(JSON.parse(message.data));
      });
    };
    return dataStream;
  };
  methods = {
    connected: function(){ return connected },
    attempt_restart: function(){
      close_connection();
      new_data_stream();
      return true;
    },
    currentChannels: currentChannels,
    close: function(){ return close_connection(); },
    on_connection_close_callback: function(){},
    on_connection_open_callback: function(){},
    subscribe: function(channel, data){
      currentChannels.push({name: channel, data: data});
      this.connected() && subscribe_to(channel, data);
    },
    unsubscribe: function(channel, data){
      for(var i=0; i<currentChannels.length; i++){ if (currentChannels[i].name===channel) {currentChannels.splice(i, 1);} }
      this.connected() && unsubscribe_from(channel, data);
    },
    send: function(channel, data, message, action){
      console.log("send requested");
      this.connected() && send_to(channel, data, message, action);
    }
  };
  return methods;
});

// SocketWrangler to start, stop or try reconnect websockets every intervalTime milliseconds.
//
// Current status is denoted by three booleans:
// connected(), connecting(), and disconnected(), in an abstraction
// of the internal trivalent logic. Exactly one will be true at all times.
//
// Actions are start() and stop()
ngActionCable.factory("SocketWrangler", function(Websocket) {
  var intervalTime= 8647;
  var websocket= Websocket;
  var _live= false;
  var _connecting= false;
  var connectNow= function(){
    websocket.attempt_restart();
  };
  var startInterval= function(){
    _connecting= _connecting || setInterval(function(){
      connectNow();
    }, intervalTime);
  };
  var stopInterval= function(){
    clearInterval(_connecting);
    _connecting= false;
  };
  websocket.on_connection_close_callback = function(){
    if (_live) { startInterval(); };
    console.log("close callback");
  };
  websocket.on_connection_open_callback = function(){
    stopInterval();
    console.log("open callback");
  };
  var methods= {
    connected: function(){
      return (_live && !_connecting);
    },
    connecting: function(){
      return (_live && !!_connecting);
    },
    disconnected: function(){
      return !_live;
    },
    start: function(){
      console.info("Live STARTED");
      _live= true;
      startInterval();
      connectNow();
    },
    stop: function(){
      console.info("Live stopped");
      _live= false;
      stopInterval();
      websocket.close();
    }
  };
  return methods;
});
