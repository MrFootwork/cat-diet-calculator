import { describe, expect, it } from 'vitest'
import DataProcessorDry from '@/model/DataProcessorDry'

const DataProcessor = DataProcessorDry.getInstance()

describe('test', () => {
	it('has data', () => {
		console.log(DataProcessor.data)
		expect(DataProcessor.data).toBe(5)
	})
})
