import { expect, test } from 'bun:test'
import { sort } from '../src/index'

test('sorting', () => {
  const list = ['1.2.3+1', '1.2.3+0', '1.2.3', '5.9.6', '0.1.2']
  const sorted = ['0.1.2', '1.2.3', '1.2.3+0', '1.2.3+1', '5.9.6']
  expect(sort(list)).toStrictEqual(sorted)
})
