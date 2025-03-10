/**
 * General options
 */
export interface Options {
  loose?: boolean | undefined
}

/**
 * Options for `coerce()`
 */
export interface CoerceOptions extends Options {
  includePrerelease?: boolean | undefined
  /**
   * Used by `coerce()` to coerce from right to left.
   *
   * @default false
   *
   * @example
   * ```js
   * coerce('1.2.3.4', { rtl: true }) // { version: '2.3.4', ... }
   * ```
   */
  rtl?: boolean | undefined
}
