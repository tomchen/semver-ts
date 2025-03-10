import compareBuild from './compareBuild'
import { Options } from '../types/Options'

/**
 * Sorts an array of version strings in descending order using `compareBuild()` (the whole version including build identifier (`[+BUILD]`) taken into account).
 *
 * @param list array of version strings
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the sorted array
 *
 * @example
 * ```js
 * rsort(['2.0.2', '1.2.3', '1.2.4', '1.2.4-foo.bar+build.123', '1.2.4-foo.bar+build.1234']) // [ "2.0.2", "1.2.4", "1.2.4-foo.bar+build.1234", "1.2.4-foo.bar+build.123", "1.2.3" ]
 * ```
 */
const rsort = (list: string[], optionsOrLoose?: boolean | Options) =>
  list.sort((v1: string, v2: string) => compareBuild(v2, v1, optionsOrLoose))

export default rsort
