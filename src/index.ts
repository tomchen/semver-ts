/**
 * Functions in the original semver (node) but not included in this package:
 * inc
 * satisfies
 **/

/**
 * typical semver format `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`
 * - `MAJOR.MINOR.PATCH` (major, minor, patch versions) → Required (e.g., `1.2.3`)
 * - `-PRERELEASE` (prerelease) → Optional (e.g., `1.2.3-beta.1`)
 * - `+BUILD` (build identifier) → Optional (e.g., `1.2.3+20240226`)
 *
 * Only `compareBuild()`, `sort()`, and `rsort()` compare the whole `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`, all other comparison functions ignore build identifiers and only compare `MAJOR.MINOR.PATCH[-PRERELEASE]`
 **/

import clean from './functions/clean'
import { cmp, type Operator } from './functions/cmp'
import coerce from './functions/coerce'
import compare from './functions/compare'
import compareBuild from './functions/compareBuild'
import compareIdentifiers from './utils/compareIdentifiers'
import compareLoose from './functions/compareLoose'
import diff from './functions/diff'
import eq from './functions/eq'
import gt from './functions/gt'
import gte from './functions/gte'
import { inc, incThrow, type IdentifierBase } from './functions/inc'
import lt from './functions/lt'
import lte from './functions/lte'
import major from './functions/major'
import minor from './functions/minor'
import neq from './functions/neq'
import parse from './functions/parse'
import type ParsedVersion from './types/ParsedVersion'
import patch from './functions/patch'
import prerelease from './functions/prerelease'
import rcompare from './functions/rcompare'
import { FULL as semverRegex } from './regex'
import rsort from './functions/rsort'
import sort from './functions/sort'
import valid from './functions/valid'
import { type Options, type CoerceOptions } from './types/Options'
import type ReleaseType from './types/ReleaseType'

export {
  clean,
  cmp,
  type Operator,
  coerce,
  compare,
  compareBuild,
  compareIdentifiers,
  compareLoose,
  diff,
  eq,
  gt,
  gte,
  inc,
  incThrow,
  type IdentifierBase,
  lt,
  lte,
  major,
  minor,
  neq,
  parse,
  type ParsedVersion,
  patch,
  prerelease,
  rcompare,
  rsort,
  sort,
  valid,
  semverRegex,
  type Options,
  type CoerceOptions,
  type ReleaseType,
}
