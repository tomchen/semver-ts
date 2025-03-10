import { expect, test } from 'bun:test'
import { rsort } from '../src/index'

test('sorting', () => {
  const list = ['1.2.3+1', '1.2.3+0', '1.2.3', '5.9.6', '0.1.2']
  const rsorted = ['5.9.6', '1.2.3+1', '1.2.3+0', '1.2.3', '0.1.2']
  expect(rsort(list)).toStrictEqual(rsorted)
})
