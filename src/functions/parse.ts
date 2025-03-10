import { MAX_SAFE_INTEGER } from '../constants'
import { Options } from '../types/Options'
import ParsedVersion from '../types/ParsedVersion'
import { FULL, LOOSE } from '../regex'
import parseOptions from '../utils/parseOptions'
import format from '../utils/format'

const MAX_LENGTH = 256

// For internal use, used only by `parse()`
const parseThrow = (
  ver: string,
  optionsOrLoose?: boolean | Options,
): ParsedVersion => {
  if (typeof ver !== 'string') {
    throw new TypeError(
      `Invalid version. Must be a string. Got type "${typeof ver}".`,
    )
  }

  if (ver.length > MAX_LENGTH) {
    throw new TypeError(`version is longer than ${MAX_LENGTH} characters`)
  }

  const loose = parseOptions(optionsOrLoose)

  const m = ver.trim().match(loose ? LOOSE : FULL)

  if (!m) {
    throw new TypeError(`Invalid Version: ${ver}`)
  }

  const major = +m[1]
  const minor = +m[2]
  const patch = +m[3]

  // we do check MAX_SAFE_INTEGER
  if (major > MAX_SAFE_INTEGER || major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (minor > MAX_SAFE_INTEGER || minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (patch > MAX_SAFE_INTEGER || patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  const prerelease: ReadonlyArray<string | number> = !m[4]
    ? []
    : m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })

  const build = m[5] ? m[5].split('.') : []

  const [version, fullVersion] = format(major, minor, patch, prerelease, build)

  return { version, fullVersion, major, minor, patch, prerelease, build }
}

/**
 * Return the parsed version of a semver string, if the semver string is not valid, it returns `null` or throws an error depending on the value of `throwErrors`
 *
 * @param ver version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 * @param throwErrors whether to throw an error if the version string is invalid or if there are other errors. Defaults to `false`
 *
 * @returns parsed version object, or `null` if the version string is invalid or if there are other errors (if `throwErrors` is truthy, an error will be thrown instead of returning `null`)
 *
 * @throws TypeError if the version string is invalid or if there are other errors (if `throwErrors` is falsy, it will return `null` instead of throwing an error)
 *
 * @example
 * ```js
 * parse('1.2.3') // { version: '1.2.3', fullVersion: "1.2.3", major: 1, minor: 2, patch: 3, prerelease: [], build: [] }
 * parse('1.2.3-foo.bar+build.123') // { version: '1.2.3-foo.bar', fullVersion: "1.2.3-foo.bar+build.123", major: 1, minor: 2, patch: 3, prerelease: ['foo', 'bar'], build: ['build', '123'] }
 * parse('1.2') // null
 * parse('1.2', { loose: true }, true) // throws TypeError: Invalid Version: 1.2
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is taken into account
 */
const parse = <T extends boolean>(
  ver: string,
  optionsOrLoose?: boolean | Options,
  throwErrors?: T,
): T extends true ? ParsedVersion : ParsedVersion | null => {
  try {
    return parseThrow(ver, optionsOrLoose)
  } catch (err) {
    if (!throwErrors) {
      return null as unknown as ParsedVersion
    }
    throw err
  }
}

export default parse
