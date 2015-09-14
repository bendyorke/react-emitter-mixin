# react-event-mixin

A mixin for React to handle custom event emission.

## Basic Usage

The default export for the module is the EventMixin object (it is also available as a named export by the same same).  It is initialized with a subscribe method, which accepts a list of events.

Each event will provide you with 4 convenience functions.  For example, if the event is named 'mutate', the component has access to:

| Event             | Description                                   |
|------------------:|:----------------------------------------------|
| `emitMutate`      | emits a mutate event                          |
| `onMutate`        | handler called when a mutate event is emitted |
| `beforeMutate`    | called before `onMutate` functions            |
| `afterMutate`     | called after `onMutate` functions             |

For example:

```
import { EventMixin } from 'react-event-mixin'

export var EventComponent = React.createClass({
  mixins: [EventMixin.subscribe('event1', 'event2', 'event3')],

  componentDidMount() {
    this.emitEvent1('hello world')
  }

  beforeEvent1() {
    console.log('before')
  }

  onEvent1(text) {
    console.log(text)
  }

  afterEvent1() {
    console.log(after)
  }
})
```

will result in the following log:

```
before
hello world
after
```

## Custom Emitter

There are 4 ways the class can find an emitter.  In order, it will

 - Check to see if it was passed an emitter.  The subscribe method can also accept an emitter in it's list of arguments
 - Check to see if there is already an emitter defined on the component
 - Check to see if there is an `emitter` prop
 - Create a new emitter

It will save the first one it finds as `emitter` on the component.

If you wish to add functionality to the emitter, you can extend the included emitter like so:

```
import { EventEmitter } from 'react-event-mixin'

export class CustomEventEmitter extends EventEmitter {
  ...
}
```

then pass it into subscribe:

```
import { CustomEventEmitter } from './custom-event-emitter.js'
import { EventMixin } from 'react-event-mixin'

export var EventComponent = React.createClass({
  mixins: [EventMixin.subscribe('mutate', new CustomEventEmitter())
})
```
