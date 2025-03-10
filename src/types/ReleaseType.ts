/**
 * The release type, could be "major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease". This type does not include 'release'
 */
export type ReleaseType =
  | 'major'
  | 'premajor'
  | 'minor'
  | 'preminor'
  | 'patch'
  | 'prepatch'
  | 'prerelease'

export default ReleaseType
