import compareIdentifiers from '../utils/compareIdentifiers'
import ParsedVersion from '../types/ParsedVersion'

export const compareMainCore = (
  parsedV1: ParsedVersion,
  parsedV2: ParsedVersion,
) => {
  return (
    compareIdentifiers(parsedV1.major, parsedV2.major) ||
    compareIdentifiers(parsedV1.minor, parsedV2.minor) ||
    compareIdentifiers(parsedV1.patch, parsedV2.patch)
  )
}

const comparePreCore = (
  prerelease1: ReadonlyArray<string | number>,
  prerelease2: ReadonlyArray<string | number>,
): 0 | 1 | -1 => {
  // NOT having a prerelease is > having one
  if (prerelease1.length && !prerelease2.length) {
    return -1
  }
  if (!prerelease1.length && prerelease2.length) {
    return 1
  }
  if (!prerelease1.length && !prerelease2.length) {
    return 0
  }

  let i = 0
  while (true) {
    const a = prerelease1[i]
    const b = prerelease2[i]

    if (a === undefined && b === undefined) {
      return 0
    }
    if (b === undefined) {
      return 1
    }
    if (a === undefined) {
      return -1
    }
    if (a !== b) {
      return compareIdentifiers(a, b)
    }

    i++
  }
}

const compareCore = (parsedV1: ParsedVersion, parsedV2: ParsedVersion) => {
  if (parsedV1.version === parsedV2.version) {
    return 0
  }
  return (
    compareMainCore(parsedV1, parsedV2) ||
    comparePreCore(parsedV1.prerelease, parsedV2.prerelease)
  )
}

export default compareCore
