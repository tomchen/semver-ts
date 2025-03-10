import { CoerceOptions } from '../types/Options'
import { COERCE, COERCEFULL, COERCERTL, COERCERTLFULL } from '../regex'
import parse from './parse'

/**
 * Coerces a string if possible
 *
 * @param version string to coerce
 * @param options options object
 * @returns version string (including build identifier if it exists) or null if the version string is invalid
 *
 * @example
 * ```js
 * coerce('1.2.3.4') // '1.2.3'
 * coerce('1.2.3.4', { rtl: true }) // '2.3.4'
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is taken into account
 */
const coerce = (
  version: string | number | null | undefined,
  options?: CoerceOptions,
) => {
  let _version = version
  if (typeof _version === 'number') {
    _version = String(_version)
  }

  if (typeof _version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = _version.match(options.includePrerelease ? COERCEFULL : COERCE)
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    const coerceRtlRegex = options.includePrerelease ? COERCERTLFULL : COERCERTL
    let next
    while (
      (next = coerceRtlRegex.exec(_version)) &&
      (!match || match.index + match[0].length !== _version.length)
    ) {
      if (
        !match ||
        next.index + next[0].length !== match.index + match[0].length
      ) {
        match = next
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    coerceRtlRegex.lastIndex = -1
  }

  if (match === null) {
    return null
  }

  const major = match[2]
  const minor = match[3] || '0'
  const patch = match[4] || '0'
  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : ''
  const build = options.includePrerelease && match[6] ? `+${match[6]}` : ''

  const parsed = parse(
    `${major}.${minor}.${patch}${prerelease}${build}`,
    options,
  )
  return parsed ? parsed.fullVersion : null
}

export default coerce
