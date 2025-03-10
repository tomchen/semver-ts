import compareBuild from './compareBuild'
import { Options } from '../types/Options'

/**
 * Sorts an array of version strings in ascending order using `compareBuild()` (the whole version including build identifier (`[+BUILD]`) taken into account).
 *
 * @param list array of version strings
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the sorted array
 *
 * @example
 * ```js
 * sort(['2.0.2', '1.2.3', '1.2.4', '1.2.4-foo.bar+build.123', '1.2.4-foo.bar+build.1234']) // [ "1.2.3", "1.2.4-foo.bar+build.123", "1.2.4-foo.bar+build.1234", "1.2.4", "2.0.2" ]
 * ```
 */
const sort = (list: string[], optionsOrLoose?: boolean | Options) =>
  list.sort((v1: string, v2: string) => compareBuild(v1, v2, optionsOrLoose))

export default sort
