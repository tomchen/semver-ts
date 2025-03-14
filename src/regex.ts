// result of re[t.????] from https://github.com/npm/node-semver/blob/main/internal/re.js

// FULL
/**
 * Regular expression to match semver strings in the form `major.minor.patch-prerelease+build`
 */
export const FULL =
  /^v?(0|[1-9]\d{0,256})\.(0|[1-9]\d{0,256})\.(0|[1-9]\d{0,256})(?:-((?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*))?(?:\+([a-zA-Z0-9-]{1,250}(?:\.[a-zA-Z0-9-]{1,250})*))?$/

export const LOOSE =
  /^[v=\s]*(\d{1,256})\.(\d{1,256})\.(\d{1,256})(?:-?((?:\d{1,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:\d{1,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*))?(?:\+([a-zA-Z0-9-]{1,250}(?:\.[a-zA-Z0-9-]{1,250})*))?$/

export const COERCEFULL =
  /(^|[^\d])(\d{1,16})(?:\.(\d{1,16}))?(?:\.(\d{1,16}))?(?:(?:-((?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*)))?(?:(?:\+([a-zA-Z0-9-]{1,250}(?:\.[a-zA-Z0-9-]{1,250})*)))?(?:$|[^\d])/

export const COERCE =
  /(^|[^\d])(\d{1,16})(?:\.(\d{1,16}))?(?:\.(\d{1,16}))?(?:$|[^\d])/

export const COERCERTLFULL =
  /(^|[^\d])(\d{1,16})(?:\.(\d{1,16}))?(?:\.(\d{1,16}))?(?:(?:-((?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*)))?(?:(?:\+([a-zA-Z0-9-]{1,250}(?:\.[a-zA-Z0-9-]{1,250})*)))?(?:$|[^\d])/g

export const COERCERTL =
  /(^|[^\d])(\d{1,16})(?:\.(\d{1,16}))?(?:\.(\d{1,16}))?(?:$|[^\d])/g

export const PRERELEASE =
  /^(?:-((?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:0|[1-9]\d{0,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*))$/

export const PRERELEASELOOSE =
  /^(?:-?((?:\d{1,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250})(?:\.(?:\d{1,256}|\d{0,256}[a-zA-Z-][a-zA-Z0-9-]{0,250}))*))$/
