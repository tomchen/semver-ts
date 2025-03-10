import { expect, test } from 'bun:test'
import { rcompare } from '../src/index'

test('rcompare', () => {
  expect(rcompare('1.0.0', '1.0.1')).toBe(1)
  expect(rcompare('1.0.0', '1.0.0')).toBe(0)
  expect(rcompare('1.0.0+0', '1.0.0')).toBe(0)
  expect(rcompare('1.0.1', '1.0.0')).toBe(-1)
})
