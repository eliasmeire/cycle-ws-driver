import {Observable} from 'rxjs/Observable'
import 'rxjs/observable/dom/webSocket'
import {adapt} from '@cycle/run/lib/adapt'

export const makeWebSocketDriver = (url) => {
  const webSocket$ = Observable.webSocket(url)
  return sink$ => {
    Observable.from(sink$)
    .subscribe(message => {
      webSocket$.next(message)
    })
    return adapt(webSocket$)
  }
}

export default makeWebSocketDriver
