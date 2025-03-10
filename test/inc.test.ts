import { expect, test } from 'bun:test'
import { inc, Options, parse, ReleaseType } from '../src/index'
import increments from './fixtures/increments'
import { incThrow } from '../src/functions/inc'

test('increment versions test', () => {
  increments.forEach(([pre, what, wanted, options, id, base]) => {
    // @ts-expect-error for testing
    const found = inc(pre, what, options, id, base)
    expect(found).toBe(wanted)

    // @ts-expect-error for testing
    const parsed = parse(pre, options)
    // @ts-expect-error for testing
    const parsedAsInput = parse(pre, options)
    if (wanted) {
      const parsed2 = parse(
        incThrow(
          parsed?.fullVersion ?? '',
          what,
          id as string | undefined,
          base as '0' | '1' | false,
        ) ?? '',
      )
      expect(parsed2?.version).toBe(wanted)
      if (parsed2?.build.length) {
        expect(parsed2.fullVersion).toBe(`${wanted}+${parsed2.build.join('.')}`)
      } else {
        expect(parsed2?.fullVersion).toBe(wanted)
      }

      const preIncObject = JSON.stringify(parsedAsInput)
      inc(
        parsedAsInput?.fullVersion ?? '',
        what,
        options as boolean | Options | undefined,
        id as string,
        base as false | '0' | '1' | undefined,
      )
      const postIncObject = JSON.stringify(parsedAsInput)
      expect(postIncObject).toBe(preIncObject)
    } else if (parsed) {
      expect(() => {
        incThrow(parsed.fullVersion, what as ReleaseType | 'release', id, base)
      }).toThrow()
    } else {
      expect(parsed).toBe(null)
    }
  })
})
