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
  };

  return methods;
});
