# angular-actioncable
An Angular 1.x service for seamlessly integrating Rails 5.x (ActionCable) into frontend Angular code.

## Usage

#### The One-Liner. (not recommended, but possible)

```html
  <%= action_cable_meta_tag %>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
  <script src="bower_components/angular-websocket/angular-websocket.min.js"></script>
  <script src="bower_components/angular-actioncable/src/angular-actioncable.js"></script>
  <section ng-controller="SomeController">
    <ul>
      <li ng-repeat="datum in MyData">
        {{ datum }}
      </li>
    </ul>
  </section>
  <script>
    angular.module('YOUR_APP', [
      'ngActionCable'
    ])
    .controller('SomeController', function ($scope, ActionCableChannel) {
      $scope.MyData = [];

      (new ActionCableChannel("MyChannel")).subscribe(function(message){ $scope.MyData.unshift(message) })

    });
  </script>
```

#### A better way

```html
  <%= action_cable_meta_tag %>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
  <script src="bower_components/angular-websocket/angular-websocket.min.js"></script>
  <script src="bower_components/angular-actioncable/src/angular-actioncable.js"></script>
  <section ng-controller="SomeController">
    <ul>
      <li ng-repeat="datum in MyData">
        {{ datum }}
      </li>
    </ul>
    <input ng-model="input_text" /><button ng-click="sendToMyChannel(input_text)">Send</button>
  </section>
  <script>
    angular.module('YOUR_APP', [
      'ngActionCable'
    ])
    .controller('SomeController', function ($scope, ActionCableChannel) {
      $scope.input_text = "";
      $scope.MyData = [];

      var channelParams = {user: 42, chat: 37};
      var channel = new ActionCableChannel("MyChannel", channelParams));
      var callback = function(message){
        $scope.MyData.unshift(message);
      };
      channel.subscribe(callback);
      $scope.sendToMyChannel = function(message){ channel.send(message, 'send_a_message') };
      $scope.$on("$destroy", function(){
        channel.unsubscribe();
      });

    });
  </script>
```

```ruby
class MyChannel < ApplicationCable::Channel
  # ...
  def send_a_message(message)
    # ...
  end
end
```

## API

### Factory: `ActionCableChannel`

_constructor function_

##### Methods
name        | arguments                                              | description
------------|--------------------------------------------------------|--------------------------------------------
new         | channel_name:String<br />channelParams:Hash:_optional_ | Creates and opens an ActionCableChannel instance. `var channel = new ActionCableChannel('MyChannel');`
subscribe   | callback:Function                                      | Subscribes a callback function to the channel. `channel.subscribe(function(message){ $scope.thing = message });`
unsubscribe |                                                        | Unsubscribes the callback function from the channel.
send        | message:String<br />action:String                      | Send a message to an action in Rails. The action is the method name in Ruby.

### Factory: `ngActionCableSocketWrangler`

_singleton_

##### Methods
name        | arguments                                              | description
------------|--------------------------------------------------------|--------------------------------------------
start       |                                                        | Starts ngActionCable services. `ngActionCableSocketWrangler.start();`<br />This will start by default unless disabled.
stop        |                                                        | Stops ngActionCable services. `ngActionCableSocketWrangler.stop();`

##### Properties

_Exactly one will be true at all times._

name             | type              | description
-----------------|-------------------|------------
connected        | Function:Boolean  | ngActionCable is started and connected live. `ngActionCableSocketWrangler.connected();`
connecting       | Function:Boolean  | ngActionCable is started and trying to establish a connection. `ngActionCableSocketWrangler.connecting();`
disconnected     | Function:Boolean  | ngActionCable is stopped and not connected. `ngActionCableSocketWrangler.disconnected();`

### Configuration: `ngActionCableConfig`

_value_

##### Properties

_You can override the defaults._

name      | type    | description
----------|---------|------------
wsUri     | String  | URI to connect ngActionCable to ActionCable.  If this is inside Rails, it will be read from the action_cable_meta_tag but can still be overridden.
autoStart | Boolean | Connect automatically? `ngActionCableConfig.autoStart= false;` default is true.
debug     | Boolean | Show verbose logs. `ngActionCableConfig.debug= true;` default is false.

```javascript
my_app.run(function (ngActionCableConfig) {
  ngActionCableConfig.wsUri= "ws://example.com/cable";
  ngActionCableConfig.autoStart= false;
});
```

## Frequently Asked Questions

 * *Q.*: What if the browser doesn't support WebSockets?
 * *A.*: This module depends on [angular-websocket](https://github.com/AngularClass/angular-websocket) which will not help; it does not have a fallback story for browsers that do not support WebSockets. Please [check](http://caniuse.com/#feat=websockets) your browser target support.

## License
UNLICENSED private


## Setup Development
`npm install`
`bower install`
