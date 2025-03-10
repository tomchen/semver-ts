import { expect, test } from 'bun:test'
import { coerce, compare, compareBuild, valid } from '../src/index'

function repeatStr(str: string, count: number): string {
  if (count < 0 || count === Infinity) {
    throw new RangeError('Invalid repeat count')
  }
  let result = ''
  for (let i = 0; i < count; i++) {
    result += str
  }
  return result
}

test('coerce tests', () => {
  // Expected to be null (cannot be coerced).
  const coerceToNull = [
    null,
    { version: '1.2.3' },
    function () {
      return '1.2.3'
    },
    '',
    '.',
    'version one',
    repeatStr('9', 16),
    repeatStr('1', 17),
    `a${repeatStr('9', 16)}`,
    `a${repeatStr('1', 17)}`,
    `${repeatStr('9', 16)}a`,
    `${repeatStr('1', 17)}a`,
    `${repeatStr('9', 16)}.4.7.4`,
    `${repeatStr('9', 16)}.${repeatStr('2', 16)}.${repeatStr('3', 16)}`,
    `${repeatStr('1', 16)}.${repeatStr('9', 16)}.${repeatStr('3', 16)}`,
    `${repeatStr('1', 16)}.${repeatStr('2', 16)}.${repeatStr('9', 16)}`,
  ] as const
  coerceToNull.forEach((input) => {
    // @ts-expect-error for testing
    expect(coerce(input)).toStrictEqual(null)
  })

  // Expected to be valid.
  const coerceToValid = [
    ['1.2.3', '1.2.3'],
    ['.1', '1.0.0'],
    ['.1.', '1.0.0'],
    ['..1', '1.0.0'],
    ['.1.1', '1.1.0'],
    ['1.', '1.0.0'],
    ['1.0', '1.0.0'],
    ['1.0.0', '1.0.0'],
    ['0', '0.0.0'],
    ['0.0', '0.0.0'],
    ['0.0.0', '0.0.0'],
    ['0.1', '0.1.0'],
    ['0.0.1', '0.0.1'],
    ['0.1.1', '0.1.1'],
    ['1', '1.0.0'],
    ['1.2', '1.2.0'],
    ['1.2.3', '1.2.3'],
    ['1.2.3.4', '1.2.3'],
    ['13', '13.0.0'],
    ['35.12', '35.12.0'],
    ['35.12.18', '35.12.18'],
    ['35.12.18.24', '35.12.18'],
    ['v1', '1.0.0'],
    ['v1.2', '1.2.0'],
    ['v1.2.3', '1.2.3'],
    ['v1.2.3.4', '1.2.3'],
    [' 1', '1.0.0'],
    ['1 ', '1.0.0'],
    ['1 0', '1.0.0'],
    ['1 1', '1.0.0'],
    ['1.1 1', '1.1.0'],
    ['1.1-1', '1.1.0'],
    ['1.1-1', '1.1.0'],
    ['a1', '1.0.0'],
    ['a1a', '1.0.0'],
    ['1a', '1.0.0'],
    ['version 1', '1.0.0'],
    ['version1', '1.0.0'],
    ['version1.0', '1.0.0'],
    ['version1.1', '1.1.0'],
    ['42.6.7.9.3-alpha', '42.6.7'],
    ['v2', '2.0.0'],
    ['v3.4 replaces v3.3.1', '3.4.0'],
    ['4.6.3.9.2-alpha2', '4.6.3'],
    [`${repeatStr('1', 17)}.2`, '2.0.0'],
    [`${repeatStr('1', 17)}.2.3`, '2.3.0'],
    [`1.${repeatStr('2', 17)}.3`, '1.0.0'],
    [`1.2.${repeatStr('3', 17)}`, '1.2.0'],
    [`${repeatStr('1', 17)}.2.3.4`, '2.3.4'],
    [`1.${repeatStr('2', 17)}.3.4`, '1.0.0'],
    [`1.2.${repeatStr('3', 17)}.4`, '1.2.0'],
    [
      `${repeatStr('1', 17)}.${repeatStr('2', 16)}.${repeatStr('3', 16)}`,
      `${repeatStr('2', 16)}.${repeatStr('3', 16)}.0`,
    ],
    [
      `${repeatStr('1', 16)}.${repeatStr('2', 17)}.${repeatStr('3', 16)}`,
      `${repeatStr('1', 16)}.0.0`,
    ],
    [
      `${repeatStr('1', 16)}.${repeatStr('2', 16)}.${repeatStr('3', 17)}`,
      `${repeatStr('1', 16)}.${repeatStr('2', 16)}.0`,
    ],
    [`11${repeatStr('.1', 126)}`, '11.1.1'],
    [repeatStr('1', 16), `${repeatStr('1', 16)}.0.0`],
    [`a${repeatStr('1', 16)}`, `${repeatStr('1', 16)}.0.0`],
    [`${repeatStr('1', 16)}.2.3.4`, `${repeatStr('1', 16)}.2.3`],
    [`1.${repeatStr('2', 16)}.3.4`, `1.${repeatStr('2', 16)}.3`],
    [`1.2.${repeatStr('3', 16)}.4`, `1.2.${repeatStr('3', 16)}`],
    [
      `${repeatStr('1', 16)}.${repeatStr('2', 16)}.${repeatStr('3', 16)}`,
      `${repeatStr('1', 16)}.${repeatStr('2', 16)}.${repeatStr('3', 16)}`,
    ],
    [`1.2.3.${repeatStr('4', 252)}.5`, '1.2.3'],
    [`1.2.3.${repeatStr('4', 1024)}`, '1.2.3'],
    [`${repeatStr('1', 17)}.4.7.4`, '4.7.4'],
    [10, '10.0.0'],
    ['1.2.3/a/b/c/2.3.4', '2.3.4', { rtl: true }],
    ['1.2.3.4.5.6', '4.5.6', { rtl: true }],
    ['1.2.3.4.5/6', '6.0.0', { rtl: true }],
    ['1.2.3.4./6', '6.0.0', { rtl: true }],
    ['1.2.3.4/6', '6.0.0', { rtl: true }],
    ['1.2.3./6', '6.0.0', { rtl: true }],
    ['1.2.3/6', '6.0.0', { rtl: true }],
    ['1.2.3.4', '2.3.4', { rtl: true }],
    ['1.2.3.4xyz', '2.3.4', { rtl: true }],

    ['1-rc.5', '1.0.0-rc.5', { includePrerelease: true }],
    ['1.2-rc.5', '1.2.0-rc.5', { includePrerelease: true }],
    ['1.2.3-rc.5', '1.2.3-rc.5', { includePrerelease: true }],
    ['1.2.3-rc.5/a', '1.2.3-rc.5', { includePrerelease: true }],
    ['1.2.3.4-rc.5', '1.2.3', { includePrerelease: true }],
    ['1.2.3.4+rev.6', '1.2.3', { includePrerelease: true }],

    ['1+rev.6', '1.0.0+rev.6', { includePrerelease: true }],
    ['1.2+rev.6', '1.2.0+rev.6', { includePrerelease: true }],
    ['1.2.3+rev.6', '1.2.3+rev.6', { includePrerelease: true }],
    ['1.2.3+rev.6/a', '1.2.3+rev.6', { includePrerelease: true }],
    ['1.2.3.4-rc.5', '1.2.3', { includePrerelease: true }],
    ['1.2.3.4+rev.6', '1.2.3', { includePrerelease: true }],

    ['1-rc.5+rev.6', '1.0.0-rc.5+rev.6', { includePrerelease: true }],
    ['1.2-rc.5+rev.6', '1.2.0-rc.5+rev.6', { includePrerelease: true }],
    ['1.2.3-rc.5+rev.6', '1.2.3-rc.5+rev.6', { includePrerelease: true }],
    ['1.2.3-rc.5+rev.6/a', '1.2.3-rc.5+rev.6', { includePrerelease: true }],

    [
      '1.2-rc.5+rev.6',
      '1.2.0-rc.5+rev.6',
      { rtl: true, includePrerelease: true },
    ],
    [
      '1.2.3-rc.5+rev.6',
      '1.2.3-rc.5+rev.6',
      { rtl: true, includePrerelease: true },
    ],
    [
      '1.2.3.4-rc.5+rev.6',
      '2.3.4-rc.5+rev.6',
      { rtl: true, includePrerelease: true },
    ],
    ['1.2.3.4-rc.5', '2.3.4-rc.5', { rtl: true, includePrerelease: true }],
    ['1.2.3.4+rev.6', '2.3.4+rev.6', { rtl: true, includePrerelease: true }],
    ['1.2.3.4-rc.5+rev.6/7', '7.0.0', { rtl: true, includePrerelease: true }],
    [
      '1.2.3.4-rc/7.5+rev.6',
      '7.5.0+rev.6',
      { rtl: true, includePrerelease: true },
    ],
    [
      '1.2.3.4/7-rc.5+rev.6',
      '7.0.0-rc.5+rev.6',
      { rtl: true, includePrerelease: true },
    ],
  ] as const
  coerceToValid.forEach(([input, expected, options]) => {
    const coercedVersion = coerce(input, options) || ''
    expect(compare(expected, coercedVersion)).toBe(0)
    expect(compareBuild(expected, coercedVersion)).toBe(0)
  })

  expect(valid(coerce('42.6.7.9.3-alpha') || '')).toStrictEqual('42.6.7')
  expect(
    valid(coerce('42.6.7-alpha+rev.1', { includePrerelease: true }) || ''),
  ).toStrictEqual('42.6.7-alpha')
  expect(valid(coerce('v2') || '')).toStrictEqual('2.0.0')
})
