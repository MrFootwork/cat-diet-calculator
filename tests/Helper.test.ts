import { describe, expect, it } from 'vitest'
import helpers from '~~/model/Helper'

describe('round', () => {
	it('rounds down', () => {
		expect(helpers.round(12.04, 1)).toBe(12)
		expect(helpers.round(12.01, 1)).toBe(12)
		expect(helpers.round(-0.6, 0)).toBe(-1)
	})
	it('rounds up', () => {
		expect(helpers.round(24.09, 1)).toBe(24.1)
		expect(helpers.round(24.05, 1)).toBe(24.1)
		expect(helpers.round(-12.5, 0)).toBe(-12)
	})
	it("doesn't round", () => {
		expect(helpers.round(24, 1)).toBe(24)
		expect(helpers.round(0, 0)).toBe(0)
		expect(helpers.round(-0, 0)).toBe(-0)
		expect(helpers.round(-12, 0)).toBe(-12)
	})
})

describe('test', () => {
	it('returns "test"', () => {
		expect(helpers.test()).toBe('test')
	})
})
