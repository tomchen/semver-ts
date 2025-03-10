import { expect, test } from 'bun:test'
import { compare, compareLoose, parse } from '../src/index'
import { eq } from '../src/index'

test('strict vs loose version numbers', () => {
  ;[
    ['=1.2.3', '1.2.3'],
    ['01.02.03', '1.2.3'],
    ['1.2.3-beta.01', '1.2.3-beta.1'],
    ['   =1.2.3', '1.2.3'],
    ['1.2.3foo', '1.2.3-foo'],
  ].forEach((v) => {
    const loose = v[0]
    const strict = v[1]
    expect(() => {
      parse(loose, undefined, true)
    }).toThrow()
    const lv = parse(loose, true, true)
    expect(lv.version).toBe(strict)
    expect(eq(loose, strict, true)).toBeTruthy()
    expect(() => {
      eq(loose, strict)
    }).toThrow()
    expect(() => {
      compare(strict, loose)
    }).toThrow()
    expect(compareLoose(v[0], v[1])).toBe(0)
  })
})
