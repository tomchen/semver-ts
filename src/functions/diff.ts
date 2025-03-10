import ReleaseType from '../types/ReleaseType'
import compareCore, { compareMainCore } from './compareCore'
import parse from './parse'

/**
 * Get difference between two versions by the release type
 *
 * @param version1 first version string
 * @param version2 second version string
 * @returns difference between two versions by the release type (major, premajor, minor, preminor, patch, prepatch, or prerelease), or null if the versions are the same.
 *
 * @example
 * ```js
 * diff('1.2.3', '1.2.3') // null
 * diff('1.2.3', '1.2.4') // 'patch'
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account
 */
const diff = (version1: string, version2: string) => {
  const v1 = parse(version1, false, true)
  const v2 = parse(version2, false, true)
  const comparison = compareCore(v1, v2)

  if (comparison === 0) {
    return null
  }

  const v1Higher = comparison > 0
  const highVersion = v1Higher ? v1 : v2
  const lowVersion = v1Higher ? v2 : v1
  const highHasPre = !!highVersion.prerelease.length
  const lowHasPre = !!lowVersion.prerelease.length

  if (lowHasPre && !highHasPre) {
    // Going from prerelease -> no prerelease requires some special casing

    // If the low version has only a major, then it will always be a major
    // Some examples:
    // 1.0.0-1 -> 1.0.0
    // 1.0.0-1 -> 1.1.1
    // 1.0.0-1 -> 2.0.0
    if (!lowVersion.patch && !lowVersion.minor) {
      return 'major'
    }

    // If the main part has no difference
    if (compareMainCore(lowVersion, highVersion) === 0) {
      if (lowVersion.minor && !lowVersion.patch) {
        return 'minor'
      }
      return 'patch'
    }
  }

  // add the `pre` prefix if we are going to a prerelease version
  const prefix = highHasPre ? 'pre' : ''

  if (v1.major !== v2.major) {
    return (prefix + 'major') as ReleaseType
  }

  if (v1.minor !== v2.minor) {
    return (prefix + 'minor') as ReleaseType
  }

  if (v1.patch !== v2.patch) {
    return (prefix + 'patch') as ReleaseType
  }

  // high and low are preleases
  return 'prerelease'
}

export default diff
