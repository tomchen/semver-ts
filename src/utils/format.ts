const format = (
  major: number,
  minor: number,
  patch: number,
  prerelease: ReadonlyArray<string | number>,
  build: ReadonlyArray<string>,
) => {
  // version does not contain build
  let version = `${major}.${minor}.${patch}`
  if (prerelease.length) {
    version += `-${prerelease.join('.')}`
  }
  let fullVersion = version
  if (build.length) {
    fullVersion += `+${build.join('.')}`
  }
  return [version, fullVersion]
}

export default format
