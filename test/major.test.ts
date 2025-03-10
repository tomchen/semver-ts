import { expect, test } from 'bun:test'
import { major } from '../src/index'

test('major tests', () => {
  // [range, version]
  // Version should be detectable despite extra characters
  ;(
    [
      ['1.2.3', 1],
      [' 1.2.3 ', 1],
      [' 2.2.3-4 ', 2],
      [' 3.2.3-pre ', 3],
      ['v5.2.3', 5],
      [' v8.2.3 ', 8],
      ['\t13.2.3', 13],
      ['=21.2.3', 21, true],
      ['v=34.2.3', 34, true],
    ] as const
  ).forEach((tuple) => {
    const range = tuple[0]
    const version = tuple[1]
    const loose = tuple[2] || false
    expect(major(range, loose)).toBe(version)
  })
})
