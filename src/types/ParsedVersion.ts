/**
 * A parsed version object as returned by `parse()`
 *
 * @example
 * ```js
 * // return value of `parse('1.2.3-foo.bar+build.123')`:
 * {
 *   version: '1.2.3-foo.bar',
 *   fullVersion: '1.2.3-foo.bar+build.123',
 *   major: 1,
 *   minor: 2,
 *   patch: 3,
 *   prerelease: ['foo', 'bar'],
 *   build: ['build', '123']
 * }
 * ```
 */
export default interface ParsedVersion {
  /**
   * The parsed version string with prerelease version if it exists, but without build identifier (the bit after `+` in the version string)
   */
  version: string
  /**
   * The parsed version string with prerelease version and build identifier (the bit after `+` in the version string) if they exists
   */
  fullVersion: string
  /**
   * The major version number
   */
  major: number
  /**
   * The minor version number
   */
  minor: number
  /**
   * The patch version number
   */
  patch: number
  /**
   * The prerelease version number as an array of strings and/or numbers, or an empty array if it doesn't exist
   */
  prerelease: ReadonlyArray<string | number>
  /**
   * The build identifier (the bit after `+` in the semantic version string) as an array of strings, or an empty array if it doesn't exist
   */
  build: ReadonlyArray<string>
}

// const isParsedVersion = (value: unknown): value is ParsedVersion => {
//   if (typeof value !== 'object' || value === null) {
//     return false
//   }
//   const obj = value as ParsedVersion
//   return (
//     typeof obj.version === 'string' &&
//     typeof obj.fullVersion === 'string' &&
//     typeof obj.major === 'number' &&
//     typeof obj.minor === 'number' &&
//     typeof obj.patch === 'number' &&
//     Object.prototype.toString.call(obj.prerelease) === '[object Array]' &&
//     obj.prerelease.every(
//       (item) => typeof item === 'string' || typeof item === 'number',
//     ) &&
//     Object.prototype.toString.call(obj.build) === '[object Array]' &&
//     obj.build.every((item) => typeof item === 'string')
//   )
// }
