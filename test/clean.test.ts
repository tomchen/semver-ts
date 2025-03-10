import { expect, test } from 'bun:test'
import { clean } from '../src/index'

test('clean tests', () => {
  // [range, version]
  // Version should be detectable despite extra characters
  ;(
    [
      ['1.2.3', '1.2.3'],
      [' 1.2.3 ', '1.2.3'],
      [' 1.2.3-4 ', '1.2.3-4'],
      [' 1.2.3-pre ', '1.2.3-pre'],
      ['  =v1.2.3   ', '1.2.3'],
      ['v1.2.3', '1.2.3'],
      [' v1.2.3 ', '1.2.3'],
      ['\t1.2.3', '1.2.3'],
      ['>1.2.3', null],
      ['~1.2.3', null],
      ['<=1.2.3', null],
      ['1.2.x', null],
      ['0.12.0-dev.1150+3c22cecee', '0.12.0-dev.1150'],
    ] as const
  ).forEach(([range, version]) => {
    expect(clean(range)).toBe(version)
  })
})
