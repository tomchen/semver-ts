import { expect, test } from 'bun:test'
import { neq } from '../src/index'
import comparisons from './fixtures/comparisons'
import equality from './fixtures/equality'

test('comparison tests', () => {
  comparisons.forEach(([v0, v1, loose]) => {
    expect(neq(v0, v1, loose)).toBeTruthy()
    expect(neq(v1, v0, loose)).toBeTruthy()
    expect(neq(v1, v1, loose)).toBe(false)
    expect(neq(v0, v0, loose)).toBe(false)
  })
})

test('equality tests', () => {
  equality.forEach(([v0, v1, loose]) => {
    expect(neq(v0, v1, loose)).toBe(false)
    expect(neq(v1, v0, loose)).toBe(false)
    expect(neq(v0, v0, loose)).toBe(false)
    expect(neq(v1, v1, loose)).toBe(false)
  })
})
