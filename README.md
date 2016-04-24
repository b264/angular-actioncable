# angular-actioncable
An Angular 1.x service for seamlessly integrating Rails 5 (ActionCable) into frontend Angular code.

## Usage

#### The One-Liner. (not recommended, but possible)

```html
  <%= action_cable_meta_tag %>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
  <script src="bower_components/angular-websocket/angular-websocket.min.js"></script>
  <script src="bower_components/angular-actioncable/src/angular-actioncable.js"></script>
  <section ng-controller="SomeController">
    <ul>
      <li ng-repeat="datum in myData">
        {{ datum }}
      </li>
    </ul>
  </section>
  <script>
    angular.module('YOUR_APP', [
      'ngActionCable'
    ])
    .controller('SomeController', function ($scope, ActionCableChannel){
      $scope.myData = [];

      // connect to ActionCable
      (new ActionCableChannel("MyChannel")).subscribe(function(message){ $scope.myData.push(message) });

    });
  </script>
```

#### A better way

```html
  <meta name="action-cable-url" content="ws://localhost:3000/cable"/>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
  <script src="bower_components/angular-websocket/angular-websocket.min.js"></script>
  <script src="bower_components/angular-actioncable/src/angular-actioncable.js"></script>
  <section ng-controller="SomeController">
    <ul>
      <li ng-repeat="datum in myData">
        {{ datum }}
      </li>
    </ul>
    <input ng-model="inputText" /><button ng-click="sendToMyChannel(inputText)">Send</button>
  </section>
  <script>
    angular.module('YOUR_APP', [
      'ngActionCable'
    ])
    .controller('SomeController', function ($scope, ActionCableChannel){
      $scope.inputText = "";
      $scope.myData = [];

      // connect to ActionCable
      var consumer = new ActionCableChannel("MyChannel", {user: 42, chat: 37}));
      var callback = function(message){ $scope.myData.push(message); };
      consumer.subscribe(callback).then(function(){
        $scope.sendToMyChannel = function(message){ consumer.send(message, 'send_a_message'); };
        $scope.$on("$destroy", function(){
          consumer.unsubscribe().then(function(){ $scope.sendToMyChannel = undefined; });
        });
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

## Support

Supports:
- Rails 5.0.0.beta3
- Rails master [at the time of writing](https://github.com/rails/rails/tree/b8d1dbf9933e3d67e15cd06116164286ba15c6a7)

## API

### Factory: `ActionCableChannel`

_constructor function_

##### Methods
name        | arguments                                                | description
------------|----------------------------------------------------------|--------------------------------------------
new         | channelName:String<br />channelParams:Hash:_optional_<br />_returns instance_    | Creates and opens an ActionCableChannel instance.<br />`var consumer = new ActionCableChannel('MyChannel', {widget_id: 17});`
subscribe   | callback:Function<br />_returns promise_                 | Subscribes a callback function to the channel.<br />`consumer.subscribe(function(message){ $scope.thing = message });`
unsubscribe | <br />_returns promise_                                  | Unsubscribes the callback function from the channel.<br />`consumer.unsubscribe();`
send        | message:String<br />action:String<br />_returns promise_ | Send a message to an action in Rails. The action is the method name in Ruby.<br />`consumer.send('message', 'action');`

### Factory: `ActionCableSocketWrangler`

_singleton_

##### Methods
name        | arguments                                              | description
------------|--------------------------------------------------------|--------------------------------------------
start       |                                                        | Starts ngActionCable services. `ActionCableSocketWrangler.start();`<br />_This will start by default unless disabled._
stop        |                                                        | Stops ngActionCable services. `ActionCableSocketWrangler.stop();`

##### Properties

_Exactly one will be true at all times._

name             | type              | description
-----------------|-------------------|------------
connected        | Function:Boolean  | ngActionCable is started and connected live.<br />`ActionCableSocketWrangler.connected();`
connecting       | Function:Boolean  | ngActionCable is started and trying to establish a connection.<br />`ActionCableSocketWrangler.connecting();`
disconnected     | Function:Boolean  | ngActionCable is stopped and not connected.<br />`ActionCableSocketWrangler.disconnected();`

### Configuration: `ActionCableConfig`

_value_

##### Properties

_You can override the defaults._

name      | type    | description
----------|---------|------------
wsUri     | String  | URI to connect ngActionCable to ActionCable.  If this is inside a Rails view, it will be read from the action_cable_meta_tag but can still be overridden.
autoStart | Boolean | Connect automatically? Default is true.<br />`ActionCableConfig.autoStart= false;`
debug     | Boolean | Show verbose logs.  Default is false.<br />`ActionCableConfig.debug= true;`

```javascript
my_app.run(function (ActionCableConfig){
  ActionCableConfig.wsUri= "wss://example.com/cable";
  ActionCableConfig.autoStart= false;
});
```

## Frequently Asked Questions

 * *Q.*: What if the browser doesn't support WebSockets?
 * *A.*: This module depends on [angular-websocket](https://github.com/AngularClass/angular-websocket) which will not help; it does not have a fallback story for browsers that do not support WebSockets. Please [check](http://caniuse.com/#feat=websockets) your browser target support.

## License
MIT


## Setup Development
 - `npm install gulp-cli --global`
 - `npm install -g karma-cli`
 - `npm install`
 - `bower install`

 - `gulp jshint` runs jshint over the `/src` javascript files
 - `gulp build` build package in `/dist` folder

 - `reset && gulp` run tests _(must have {Chromium or Chrome} and Firefox installed locally)_

 - before submitting a PR, make sure you sucessfully run:
   * `gulp jshint`
   * `gulp build`
   * `gulp test`
   * `gulp test-dist`
   * `gulp test-min`

## Publish
 - change the version in `bower.json` and `package.json` and submit a commit named `bump version` to `master` branch
 - tag a new release with the new version in github (bower will use this)
 - publish to npm: pull master, `npm login`, `npm publish`
