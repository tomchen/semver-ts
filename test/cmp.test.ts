import { expect, test } from 'bun:test'
import { cmp } from '../src/index'
import comparisons from './fixtures/comparisons'
import equality from './fixtures/equality'

test('invalid cmp usage', () => {
  expect(() => {
    // @ts-expect-error for testing
    cmp('1.2.3', 'a frog', '4.5.6')
  }).toThrowError(new TypeError('Invalid operator: a frog'))
})

test('comparison tests', () => {
  comparisons.forEach(([v0, v1, loose]) => {
    expect(cmp(v0, '>', v1, loose)).toBeTruthy()
    expect(cmp(v1, '<', v0, loose)).toBeTruthy()
    expect(!cmp(v1, '>', v0, loose)).toBeTruthy()
    expect(!cmp(v0, '<', v1, loose)).toBeTruthy()
    expect(cmp(v1, '==', v1, loose)).toBeTruthy()
    expect(cmp(v0, '>=', v1, loose)).toBeTruthy()
    expect(cmp(v1, '<=', v0, loose)).toBeTruthy()
    expect(cmp(v0, '!=', v1, loose)).toBeTruthy()
  })
})

test('equality tests', () => {
  equality.forEach(([v0, v1, loose]) => {
    expect(cmp(v0, '', v1, loose)).toBeTruthy()
    expect(cmp(v0, '=', v1, loose)).toBeTruthy()
    expect(cmp(v0, '==', v1, loose)).toBeTruthy()
    expect(!cmp(v0, '!=', v1, loose)).toBeTruthy()
    expect(!cmp(v0, '===', v1, loose)).toBeTruthy()

    // No SemVer class/object in this package, so the following 3 tests are omitted
    // // also test with an object. they are === because obj.version matches
    // t.truthy(cmp(new SemVer(v0, { loose: loose }), '===',
    //   new SemVer(v1, { loose: loose })),
    // `!cmp(${v0}===${v1}) object`)

    // t.truthy(cmp(v0, '!==', v1, loose), `cmp(${v0}!==${v1})`)

    // t.truthy(!cmp(new SemVer(v0, loose), '!==', new SemVer(v1, loose)),
    //   `cmp(${v0}!==${v1}) object`)
  })
})
