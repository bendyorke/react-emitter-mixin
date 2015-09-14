import { EventEmitter } from 'fbemitter'

export class TokenEventEmitter extends EventEmitter {
  createToken({ on, perform, subscription = "addListener" }) {
    var token = perform ? this[subscription](on, perform) : { remove() {} }
    return token
  }

  refreshCloseToken(event) {
    const token = `${event}CloseToken`
    if(this[token]) this[token].remove()
    this[token] = this.createToken({
      on: event,
      perform: (() => super.emit(`${event}Close`)),
      subscription: "once"
    })
  }

  decoratedEmit(event) {
    return ((...args) => {
      this.emit(event, ...args)
    })
  }

  emit(event, ...args) {
    super.emit(`${event}Open`)
    this.refreshCloseToken(event)
    super.emit(event, ...args)
  }
}
