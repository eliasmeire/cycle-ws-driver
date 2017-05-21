# Cycle.js WebSocket Driver

A [Cycle.js](http://cycle.js.org) [Driver](http://cycle.js.org/drivers.html) for using
[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
 in the browser.

```
npm install --save cycle-ws-driver
```

## Usage

### Basic setup

```js
import { run } from '@cycle/run';
import { makeWebSocketDriver } from 'cycle-ws-driver';

function main({ ws }) {
  ...
}

const drivers = {
  ws: makeWebSocketDriver('ws://localhost:8000')
}

Cycle.run(main, drivers);
```

### Normal usecase (with RxJS)

```js
function main({DOM, ws}) {
  const messages$ = ws.scan((acc, m) => [...acc, m], [])
  // messages$: ---[]--['message 1']--['message 1', 'message 2']-->
  const formSubmit$ = DOM.select('#form').events('submit').do(e => e.preventDefault())
  const messageInput$ = DOM.select('#message').events('input').map(e => e.target.value)
  const sendMessage$ = formSubmit$
    .withLatestFrom(messageInput$, (e, message) => message)

  const vtree$ = messages$
    .startWith([])
    .map(messages =>
      <div>
        <ul>
          { messages && messages.map(message =><li>{message}</li>) }
        </ul>
        <form id="form" action="">
          <input id="message" type="text" placeholder="Type a message..." />
          <input type="submit" id="button__send" value="Send" />
        </form>
      </div>
    )
   
    return {
      DOM: vtree$,
      ws: sendMessage$
    }
}
```

# License

[MIT](https://github.com/eliasmeire/cycle-ws-driver/blob/master/LICENSE)
