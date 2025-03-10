import eq from './eq'
import gt from './gt'
import gte from './gte'
import lt from './lt'
import lte from './lte'
import neq from './neq'
import { Options } from '../types/Options'

/**
 * Operator string for `cmp()` (could be "===", "!==", "", "=", "==", "!=", ">", ">=", "<", "<=")
 */
export type Operator =
  | '==='
  | '!=='
  | ''
  | '='
  | '=='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='

/**
 * Pass in a comparison string, and it'll call the corresponding semver comparison function.
 *
 * Throws if an invalid comparison string is provided.
 *
 * @param v1 first version string
 * @param operator operator string (could be "===", "!==", "", "=", "==", "!=", ">", ">=", "<", "<=")
 * @param v2 second version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns `true` if the comparison is true, `false` otherwise
 *
 * @example
 * ```js
 * cmp('1.2.3', '>', '1.2.2') // true
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account in all operations but "===" and "!==" which do simple comparison of the whole strings
 */
export const cmp = (
  v1: string,
  operator: Operator,
  v2: string,
  optionsOrLoose?: boolean | Options,
) => {
  switch (operator) {
    case '===': {
      return v1 === v2
    }
    case '!==': {
      return v1 !== v2
    }
    case '':
    case '=':
    case '==': {
      return eq(v1, v2, optionsOrLoose)
    }
    case '!=': {
      return neq(v1, v2, optionsOrLoose)
    }
    case '>': {
      return gt(v1, v2, optionsOrLoose)
    }
    case '>=': {
      return gte(v1, v2, optionsOrLoose)
    }
    case '<': {
      return lt(v1, v2, optionsOrLoose)
    }
    case '<=': {
      return lte(v1, v2, optionsOrLoose)
    }
    default: {
      throw new TypeError(`Invalid operator: ${operator}`)
    }
  }
}
