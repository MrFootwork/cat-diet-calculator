import { describe, expect, it } from 'vitest'
import DataProcessorWet from '~~/model/MDataProcessorWet'

describe('processed wet food data', () => {
	// setup mockup
	const DataProcessor = DataProcessorWet.getInstance()
	const dataSample = [
		{
			_id: '6292815a8fc792107f9fbe09',
			name: 'Some Wet Food Brand',
			recommendations: [
				{ weight: 3, ideal: 41, overweight: 33 },
				{ weight: 4, ideal: 50, overweight: 40 },
				{ weight: 5, ideal: 59, overweight: 47 },
				{ weight: 6, ideal: 67, overweight: 53 },
			],
			type: 'wet',
		},
	]
	DataProcessor.processData(dataSample)

	// testing results
	it('data object has correct attributes', () => {
		expect(DataProcessor.data.length).toBeGreaterThanOrEqual(1)
		expect(DataProcessor.data[0]._id).toBeTruthy
		expect(DataProcessor.data[0].name).toBeTruthy
		expect(DataProcessor.data[0].recommendations).toBeTruthy
		expect(DataProcessor.data[0].type).toBeTruthy
	})
	it('has at least 2 recommendations', () => {
		expect(DataProcessor.data[0].recommendations.length).toBeGreaterThanOrEqual(
			2
		)
	})
	it.todo('tips have been enriched')
})
