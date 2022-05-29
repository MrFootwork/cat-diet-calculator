import { describe, expect, it } from 'vitest'
import DataProcessorWet from '~~/model/DataProcessorWet'
import DataProcessorDry from '~~/model/DataProcessorDry'

describe('processed wet food data', () => {
	// setup mockup
	const processorWet = DataProcessorWet.getInstance()
	const processorDry = DataProcessorDry.getInstance()
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
		{
			_id: '6292815a8fc792107f9fbe09',
			name: 'Some Dry Food Brand',
			recommendations: [
				{ weight: 3, ideal: 41, overweight: 33 },
				{ weight: 4, ideal: 50, overweight: 40 },
				{ weight: 5, ideal: 59, overweight: 47 },
				{ weight: 6, ideal: 67, overweight: 53 },
			],
			type: 'dry',
		},
	]
	processorDry.processData(dataSample)
	processorWet.processData(dataSample)

	// testing results
	it('', () => {})
})
