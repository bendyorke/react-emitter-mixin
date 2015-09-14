import { camelCase, capitalize } from 'lodash'

var pascalize = function(string) {
  return capitalize(camelCase(string))
}

export { pascalize as default, pascalize as pascalize }
