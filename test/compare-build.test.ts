import { expect, test } from 'bun:test'
import { compareBuild } from '../src/index'

test('compareBuild', () => {
  const noBuild = '1.0.0'
  const build0 = '1.0.0+0'
  const build1 = '1.0.0+1'
  const build10 = '1.0.0+1.0'
  expect(compareBuild(noBuild, build0)).toBe(-1)
  expect(compareBuild(build0, build0)).toBe(0)
  expect(compareBuild(build0, noBuild)).toBe(1)

  expect(compareBuild(build0, '1.0.0+0.0')).toBe(-1)
  expect(compareBuild(build0, build1)).toBe(-1)
  expect(compareBuild(build1, build0)).toBe(1)
  expect(compareBuild(build10, build1)).toBe(1)
})
