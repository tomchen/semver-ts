import { expect, test } from 'bun:test'
import { parse } from '../src/index'
import invalidVersions from './fixtures/invalid-versions.js'

test('returns null instead of throwing when presented with garbage', () => {
  invalidVersions.forEach(([v, , opts]) =>
    // @ts-expect-error for testing
    expect(parse(v, opts)).toBe(null),
  )
})

test('throw errors if asked to', () => {
  expect(() => {
    // @ts-expect-error for testing
    parse('bad', null, true)
  }).toThrowError(new TypeError('Invalid Version: bad'))
  expect(() => {
    // @ts-expect-error for testing
    parse([], null, true)
  }).toThrowError(
    new TypeError('Invalid version. Must be a string. Got type "object".'),
  )
})

test('parse a version into a SemVer object', () => {
  expect(parse('1.2.3')).toMatchObject(parse('1.2.3', undefined, true))
  const loose = parse('4.2.0', { loose: true }, true)
  expect(parse('4.2.0', true)).toMatchObject(loose)
  expect(parse('4.2.0', { loose: true })).toMatchObject(loose)
})
