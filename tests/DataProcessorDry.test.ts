import { describe, expect, it } from 'vitest'
import DataProcessorDry from '~~/model/MDataProcessorDry'

describe('processed dry food data', () => {
	// setup mockup
	const processor = DataProcessorDry.getInstance()
	const dataSample = [
		{
			_id: '6292815a8fc792107f9fbe09',
			name: 'Royal Canin Care Hair&Skin',
			recommendations: [
				{ weight: 3, ideal: 41, overweight: 33 },
				{ weight: 4, ideal: 50, overweight: 40 },
				{ weight: 5, ideal: 59, overweight: 47 },
				{ weight: 6, ideal: 67, overweight: 53 },
			],
			type: 'dry',
		},
	]

	console.log('before enrichment: ', dataSample[0].recommendations)

	processor.processData(dataSample)

	// testing results
	const data = processor.data
	it('data object has correct attributes', () => {
		expect(data.length).toBeGreaterThanOrEqual(1)
		expect(data[0]._id).toBeTruthy()
		expect(data[0].name).toBeTruthy()
		expect(data[0].recommendations).toBeTruthy()
		expect(data[0].type).toBeTruthy()
	})
	it('has at least 2 recommendations', () => {
		expect(data[0].recommendations.length).toBeGreaterThanOrEqual(2)
	})
	it('enriches recommendations', () => {
		expect(data[0].recommendations.length).toBeGreaterThan(4)
	})
	it('enriches recommendations by half-step weights', () => {
		// after enrichment two adjacent recommendations
		// should be apart from each other by .5

		console.log('after enrichment: ', data[0].recommendations)

		const firstValue_1 = data[0].recommendations[0].weight
		const secondValue_1 = data[0].recommendations[1].weight
		expect((firstValue_1 + secondValue_1) % 1).toBe(0.5)
		const firstValue_2 = data[0].recommendations[1].weight
		const secondValue_2 = data[0].recommendations[2].weight
		expect((firstValue_2 + secondValue_2) % 1).toBe(0.5)
		const firstValue_3 = data[0].recommendations[2].weight
		const secondValue_3 = data[0].recommendations[3].weight
		expect((firstValue_3 + secondValue_3) % 1).toBe(0.5)
		const firstValue_4 = data[0].recommendations[3].weight
		const secondValue_4 = data[0].recommendations[4].weight
		expect((firstValue_4 + secondValue_4) % 1).toBe(0.5)
	})
})
