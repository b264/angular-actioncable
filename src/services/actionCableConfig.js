// default websocket configs
// looks for Rails' <%= action_cable_meta_tag %> in this format:
// <meta name="action-cable-url" content="ws://localhost:3000/cable"/>
ngActionCable.value('ActionCableConfig', {
    autoStart: true,
    wsUri: angular.element("meta[name='action-cable-url']").attr("content") || "",
    debug: false
  });
