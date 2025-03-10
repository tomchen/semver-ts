import { expect, test } from 'bun:test'
import { valid } from '../src/index'
import { MAX_SAFE_INTEGER } from '../src/constants'
import invalidVersions from './fixtures/invalid-versions'

test('returns null instead of throwing when presented with garbage', () => {
  invalidVersions.forEach(([v, , opts]) =>
    // @ts-expect-error for testing
    expect(valid(v, opts)).toBe(null),
  )
})

test('validate a version into a SemVer object', () => {
  expect(valid('1.2.3')).toBe('1.2.3')
  const s = '4.5.6'
  expect(valid(s)).toBe('4.5.6')
  expect(valid('4.2.0foo', true)).toBe('4.2.0-foo')
  expect(valid('4.2.0foo', { loose: true })).toBe('4.2.0-foo')
})

test('long build id', () => {
  const longBuild = '-928490632884417731e7af463c92b034d6a78268fc993bcb88a57944'
  const shortVersion = '1.1.1'
  const longVersion = `${MAX_SAFE_INTEGER}.${MAX_SAFE_INTEGER}.${MAX_SAFE_INTEGER}`
  expect(valid(shortVersion + longBuild)).toBe(shortVersion + longBuild)
  expect(valid(longVersion + longBuild)).toBe(longVersion + longBuild)
})
