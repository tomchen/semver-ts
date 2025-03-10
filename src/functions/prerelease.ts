import { Options } from '../types/Options'
import parse from './parse'

/**
 * Returns an array of prerelease components, or `null` if none exist.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns an array of prerelease components, or `null` if none exist
 *
 * @example
 * ```js
 * prerelease('1.2.3-foo.bar+build.123') // ['foo', 'bar']
 * ```
 */
const prerelease = (version: string, optionsOrLoose?: boolean | Options) => {
  const parsed = parse(version, optionsOrLoose)
  return parsed && parsed.prerelease.length ? parsed.prerelease : null
}

export default prerelease
