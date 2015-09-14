import { pascalize } from './pascalize.js'
import { TokenEventEmitter } from './emitter.js'

export var EventMixin = {
  subscribe(...events) {
    var { events, emitter } = EventMixin._filterParams(events)
    return {
      componentWillMount() {
        this.emitter = emitter || this.emitter || this.props.emitter || new TokenEventEmitter()

        for (var event of events) {
          let emission       = `emit${pascalize(event)}`
          this[emission]     = this.emitter.decoratedEmit(event)
          this.emitterTokens = { ...this.emitterTokens, ...EventMixin._generateTokens.call(this, event) }
        }

        if (!this.removeEmitterTokens) {
          this.removeEmitterTokens = () => {
            Object.keys(this.emitterTokens).forEach((key) => {
              this.emitterTokens[key].remove()
            })
          }
        }
      },

      componentWillUnmount() {
        if (this.emitterTokens) {
          this.removeEmitterTokens()
          this.emitterTokens = null
        }
      }
    }
  },

  _filterParams(args) {
    function isType(arg, type) {
      return arg && typeof arg === type
    }

    return {
      events: args.filter((arg) => isType(arg, 'string')),
      emitter: args.find((arg) =>isType(arg, 'object')),
    }
  },

  _generateTokens(event) {
    const pascalEvent = pascalize(event)
    const createToken = this.emitter.createToken.bind(this.emitter)
    return [
      [`${event}Open`,  `before${pascalEvent}`],
      [`${event}`,      `on${pascalEvent}`],
      [`${event}Close`, `after${pascalEvent}`]
    ].reduce((memo, [event, listener]) => {
      return {
        ...memo,
        [event + "Token"]: createToken({ on: event, perform: this[listener] })
      }
    }, {})
  }
}
