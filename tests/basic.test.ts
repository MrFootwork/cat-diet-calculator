import { describe, test, expect, it } from 'vitest'

describe('test', () => {
	test('this', () => {
		expect(1 + 1).toBe(2)
	})
	it('is 4', () => {
		expect(4 + 1).toBe(5)
	})
})
