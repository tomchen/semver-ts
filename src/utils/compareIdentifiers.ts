const numericRegex = /^[0-9]+$/

/**
 * Compare two identifiers.
 *
 * @param a first identifier
 * @param b second identifier
 *
 * @returns
 * - `0` if `v1` == `v2`
 * - `1` if `v1` > `v2`
 * - `-1` if `v1` < `v2`
 *
 * @example
 * ```js
 * compareIdentifiers('3', '6') // -1
 * compareIdentifiers('s6g1', '6df4') // 1
 * ```
 */
const compareIdentifiers = (a: string | number, b: string | number) => {
  let _a: string | number = a.toString()
  let _b: string | number = b.toString()

  const anum = numericRegex.test(_a)
  const bnum = numericRegex.test(_b)

  if (anum && bnum) {
    _a = +_a
    _b = +_b
  }

  return _a === _b
    ? 0
    : anum && !bnum
      ? -1
      : bnum && !anum
        ? 1
        : _a < _b
          ? -1
          : 1
}

export default compareIdentifiers
