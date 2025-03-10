import { expect, test } from 'bun:test'
import { eq } from '../src/index'
import comparisons from './fixtures/comparisons'
import equality from './fixtures/equality'

test('comparison tests', () => {
  comparisons.forEach(([v0, v1, loose]) => {
    expect(eq(v0, v1, loose)).toBe(false)
    expect(eq(v1, v0, loose)).toBe(false)
    expect(eq(v1, v1, loose)).toBeTruthy()
    expect(eq(v0, v0, loose)).toBeTruthy()
  })
})

test('equality tests', () => {
  equality.forEach(([v0, v1, loose]) => {
    expect(eq(v0, v1, loose)).toBeTruthy()
    expect(eq(v1, v0, loose)).toBeTruthy()
    expect(eq(v0, v0, loose)).toBeTruthy()
    expect(eq(v1, v1, loose)).toBeTruthy()
  })
})
