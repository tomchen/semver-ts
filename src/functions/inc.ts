import { PRERELEASE, PRERELEASELOOSE } from '../regex'
import { Options } from '../types/Options'
import ParsedVersion from '../types/ParsedVersion'
import ReleaseType from '../types/ReleaseType'
import compareIdentifiers from '../utils/compareIdentifiers'
import format from '../utils/format'
import Mutable from '../utils/Mutable'
import parseOptions from '../utils/parseOptions'
import parse from './parse'

// for internal use only. parsedVersion is mutable
const incCore = (
  parsedVersion: Mutable<ParsedVersion>,
  release: ReleaseType | 'release' | 0, // 'release' means prerelease version bumps to stable version; 0 means any 'pre' (internal use)
  identifier?: string,
  identifierBase?: IdentifierBase | false,
  loose?: boolean,
): ParsedVersion => {
  if (release === 0 || release.startsWith('pre')) {
    if (!identifier && identifierBase === false) {
      throw new Error('invalid increment argument: identifier is empty')
    }
    // Avoid an invalid semver results
    if (identifier) {
      const r = loose ? PRERELEASELOOSE : PRERELEASE
      const match = `-${identifier}`.match(r)
      if (!match || match[1] !== identifier) {
        throw new Error(`invalid identifier: ${identifier}`)
      }
    }
  }

  switch (release) {
    case 'premajor':
      parsedVersion.prerelease.length = 0
      parsedVersion.patch = 0
      parsedVersion.minor = 0
      parsedVersion.major++
      incCore(parsedVersion, 0, identifier, identifierBase, loose)
      break
    case 'preminor':
      parsedVersion.prerelease.length = 0
      parsedVersion.patch = 0
      parsedVersion.minor++
      incCore(parsedVersion, 0, identifier, identifierBase, loose)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      parsedVersion.prerelease.length = 0
      incCore(parsedVersion, 'patch', identifier, identifierBase, loose)
      incCore(parsedVersion, 0, identifier, identifierBase, loose)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (parsedVersion.prerelease.length === 0) {
        incCore(parsedVersion, 'patch', identifier, identifierBase, loose)
      }
      incCore(parsedVersion, 0, identifier, identifierBase, loose)
      break
    case 'release':
      if (parsedVersion.prerelease.length === 0) {
        throw new Error(
          `version ${parsedVersion.fullVersion} is not a prerelease`,
        )
      }
      parsedVersion.prerelease.length = 0
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (
        parsedVersion.minor !== 0 ||
        parsedVersion.patch !== 0 ||
        parsedVersion.prerelease.length === 0
      ) {
        parsedVersion.major++
      }
      parsedVersion.minor = 0
      parsedVersion.patch = 0
      parsedVersion.prerelease.length = 0
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (parsedVersion.patch !== 0 || parsedVersion.prerelease.length === 0) {
        parsedVersion.minor++
      }
      parsedVersion.patch = 0
      parsedVersion.prerelease.length = 0
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (parsedVersion.prerelease.length === 0) {
        parsedVersion.patch++
      }
      parsedVersion.prerelease.length = 0
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 `0` would become 1.0.0-0 which is the wrong direction.
    case 0: {
      const base = Number(identifierBase) ? 1 : 0

      if (parsedVersion.prerelease.length === 0) {
        parsedVersion.prerelease = [base]
      } else {
        let i = parsedVersion.prerelease.length
        while (--i >= 0) {
          if (typeof parsedVersion.prerelease[i] === 'number') {
            ;(parsedVersion.prerelease[i] as number)++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          if (
            identifier === parsedVersion.prerelease.join('.') &&
            identifierBase === false
          ) {
            throw new Error(
              'invalid increment argument: identifier already exists',
            )
          }
          parsedVersion.prerelease.push(base)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        let prerelease = [identifier, base]
        if (identifierBase === false) {
          prerelease = [identifier]
        }
        if (compareIdentifiers(parsedVersion.prerelease[0], identifier) === 0) {
          if (isNaN(parsedVersion.prerelease[1] as number)) {
            parsedVersion.prerelease = prerelease
          }
        } else {
          parsedVersion.prerelease = prerelease
        }
      }
      break
    }
    default:
      throw new Error(`invalid increment argument: ${release}`)
  }
  const { major, minor, patch, prerelease, build } = parsedVersion
  const [version, fullVersion] = format(major, minor, patch, prerelease, build)
  return {
    version,
    fullVersion,
    major,
    minor,
    patch,
    prerelease,
    build,
  }
}

/**
 * The base to use for the identifier in `inc()`, could be '0' or '1'
 */
export type IdentifierBase = '0' | '1'

/**
 * Return the version incremented by the release type (major, premajor, minor, preminor, patch, prepatch, or prerelease), or null if it's not valid.
 *
 * @param version - The version to increment
 * @param release - The release type to use, could be "major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease", 'release'
 * @param optionsOrLoose - An options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings **this param can be omitted, making `identifier` and `identifierBase` the third and the fourth params respectively**
 * @param identifier - The identifier to use for prerelease versions
 * @param identifierBase - The base to use for the identifier, could be '0' or '1'
 *
 * @returns The incremented version, or null if it's not valid
 *
 * @example
 * ```js
 * inc('1.2.3', 'minor') // '1.3.0'
 * inc('1.2.3', 'prerelease') // '1.2.4-0'
 * inc('1.2', 'minor') // null
 * ```
 */
export function inc(
  version: string,
  release: ReleaseType | 'release',
  optionsOrLoose?: boolean | Options,
  identifier?: string,
  identifierBase?: IdentifierBase | false,
): string | null
export function inc(
  version: string,
  release: ReleaseType | 'release',
  identifier?: string,
  identifierBase?: IdentifierBase | false,
): string | null
export function inc(
  version: string,
  release: ReleaseType | 'release',
  options?: boolean | Options | string,
  identifier?: string | IdentifierBase | false,
  identifierBase?: IdentifierBase | false | boolean,
): string | null {
  let _options = options
  let _identifier = identifier
  let _identifierBase: IdentifierBase | false | boolean | undefined =
    identifierBase
  if (typeof _options === 'string') {
    _identifierBase = _identifier as IdentifierBase | false | undefined
    _identifier = _options
    _options = undefined
  }

  const loose = parseOptions(_options)

  try {
    return incCore(
      parse(version, _options, true) as Mutable<ParsedVersion>,
      release,
      _identifier as string | undefined,
      _identifierBase as IdentifierBase | false | undefined,
      loose,
    ).version
  } catch {
    return null
  }
}

/**
 * Return the version incremented by the release type (major, premajor, minor, preminor, patch, prepatch, or prerelease)
 *
 * @param version - The version to increment
 * @param release - The release type to use, could be "major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease", 'release'
 * @param identifier - The identifier to use for prerelease versions
 * @param identifierBase - The base to use for the identifier, could be '0' or '1'
 * @param optionsOrLoose - An options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns The incremented version
 *
 * @throws TypeError if the version string is invalid or if there are other errors
 *
 * @example
 * ```js
 * incThrow('1.2.3', 'minor') // '1.3.0'
 * incThrow('1.2', 'minor') // throws TypeError: Invalid Version: 1.2
 * ```
 *
 * @remarks unlike `inc()` which returns `null` if error occurs, this function could throw error
 */
export const incThrow = (
  version: string,
  release: ReleaseType | 'release',
  identifier?: string,
  identifierBase?: IdentifierBase | false,
  optionsOrLoose?: boolean | Options,
): string => {
  const loose = parseOptions(optionsOrLoose)
  return incCore(
    parse(version, optionsOrLoose, true) as Mutable<ParsedVersion>,
    release,
    identifier,
    identifierBase,
    loose,
  ).version
}
