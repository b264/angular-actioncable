// default websocket configs
// looks for Rails' <%= action_cable_meta_tag %> in this format:
// <meta name="action-cable-url" content="ws://localhost:3000/cable"/>
angular.module('ngActionCable.config',[])
  .value('WebsocketConfig', {
    autoStart: true,
    wsUri: angular.element("meta[name='action-cable-url']").attr("content") || "",
    debug: false
  });
