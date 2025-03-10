import { expect, test } from 'bun:test'
import { compare } from '../src/index'
import comparisons from './fixtures/comparisons'
import equality from './fixtures/equality'

test('comparison tests', () => {
  comparisons.forEach(([v0, v1, loose]) => {
    expect(compare(v0, v1, loose)).toBe(1)
    expect(compare(v1, v0, loose)).toBe(-1)
    expect(compare(v0, v0, loose)).toBe(0)
    expect(compare(v1, v1, loose)).toBe(0)
  })
})

test('equality tests', () => {
  // [version1, version2]
  // version1 should be equivalent to version2
  equality.forEach(([v0, v1, loose]) => {
    expect(compare(v0, v1, loose)).toBe(0)
    expect(compare(v1, v0, loose)).toBe(0)
    expect(compare(v0, v0, loose)).toBe(0)
    expect(compare(v1, v1, loose)).toBe(0)

    // also test with an object. they are === because obj.version matches
    expect(compare(v0, v1, { loose })).toBe(0)
  })
})
