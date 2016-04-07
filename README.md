# angular-actioncable
An Angular 1.x service for seamlessly integrating Rails 5.x (ActionCable) into frontend Angular code.

## Usage

#### The One-Liner. (not recommended, but possible)

```html
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
    .controller('SomeController', function ($scope, WebsocketChannel) {
      $scope.MyData = [];
      (new WebsocketChannel("YourChannel")).subscribe(function(message){ $scope.MyData.unshift(message) })
    });
  </script>
```

#### A better way

```html
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
    .controller('SomeController', function ($scope, WebsocketChannel) {
      $scope.MyData = [];
      var channelParams = {user: 42, chat: 37};
      var channel = new WebsocketChannel("YourChannel", channelParams));
      var callback = function(message){
        $scope.MyData.unshift(message);
      };
      channel.subscribe(callback);
      $scope.$on("$destroy", function(){
        channel.unsubscribe();
      });
    });
  </script>
```

## API

### Factory: `WebsocketChannel` (in module `ngActionCable`)

returns prototype of WebsocketChannel

#### Methods

name        | arguments                                  | description
------------|--------------------------------------------|--------------------------------------------
new         | channel_name:String [, channelParams:Hash] | Creates and opens a WebsocketChannel instance. `var channel = new WebsocketChannel('YourChannel');`
subscribe   | callback:Function                          | Subscribes a callback function to the channel. `channel.subscribe(function(message){ $scope.thing = message });`
unsubscribe |                                            | Unsubscribes the callback function from the channel.
send        | message:String, action:String              | Send a message to an action in Rails. `class YourChannel < ApplicationCable::Channel; def action(message); end; end`  `channel.send("my message", "action");`


## Frequently Asked Questions

 * *Q.*: What if the browser doesn't support WebSockets?
 * *A.*: This module depends on [angular-websocket](https://github.com/AngularClass/angular-websocket) which will not help; it does not have a fallback story for browsers that do not support WebSockets. Please [check](http://caniuse.com/#feat=websockets) your browser target support.

## License
UNLICENSED private


## Setup Development
`npm install`
`bower install`
