import { describe, expect, it } from 'vitest'
import DataProcessorWet from '~~/model/MDataProcessorWet'
import DataProcessorDry from '~~/model/MDataProcessorDry'
import Calculator from '~~/model/MCalculator'

// setup mockup
const dataSample = [
	{
		_id: '6292815a8fc792107f9fbe09',
		name: 'Some Wet Food Brand',
		recommendations: [
			{ weight: 3, ideal: 1, overweight: 1.5 },
			{ weight: 4, ideal: 1.5, overweight: 2 },
			{ weight: 5, ideal: 2, overweight: 2.5 },
			{ weight: 6, ideal: 2.5, overweight: 3 },
		],
		type: 'wet',
	},
	{
		_id: '6292815a8fc792107f9fbe09',
		name: 'Dry Food 1',
		recommendations: [
			{ weight: 3, ideal: 41, overweight: 33 },
			{ weight: 4, ideal: 50, overweight: 40 },
			{ weight: 5, ideal: 59, overweight: 47 },
			{ weight: 6, ideal: 67, overweight: 53 },
		],
		type: 'dry',
	},
]
const mockup = function () {
	const processorWet = DataProcessorWet.getInstance()
	const processorDry = DataProcessorDry.getInstance()

	processorDry.processData(dataSample)
	processorWet.processData(dataSample)

	const calculator = Calculator.getInstance()
	return { processorWet, processorDry, calculator }
}

const fakeProcessedDryData = function (dataSample) {
	const processedData = dataSample
		.filter(brand => brand.type === 'dry')
		.map(brand => {
			return { ...brand, isMixPortion: true, mixPortion: 1 }
		})
	return processedData
}

// set wet food usage to 1 pack
const fakeProcessedWetData = function (dataSample) {
	const processedData = dataSample
		.filter(brand => brand.type === 'wet')
		.map(brand => {
			return { ...brand, isMixPortion: true, mixPortion: 1 }
		})
	return processedData
}

describe('getInstance()', () => {
	const { calculator } = mockup()
	it('works', () => {
		const calculator2 = Calculator.getInstance()
		expect(calculator2).toBe(calculator)
		expect(calculator2).toBeInstanceOf(Calculator)
	})
})

describe('result()', () => {
	it('assumes', () => {
		const { calculator } = mockup()
		expect(calculator.catWeight).toBe(4)
		expect(calculator.catShape).toBe('ideal')
	})

	it('recommends for one dry brand', () => {
		const { calculator } = mockup()
		const processedData = fakeProcessedDryData(dataSample)

		expect(calculator.getResult(processedData)).toBe(50)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		expect(calculator.getResult(processedData)).toBe(47)
	})

	it('recommends for two dry brands', () => {
		const { calculator } = mockup()
		const secondDryFoodBrand = {
			_id: '6292815a8fc792107f9fbe09',
			name: 'Dry Food 2',
			recommendations: [
				{ weight: 3, ideal: 43, overweight: 35 },
				{ weight: 4, ideal: 53, overweight: 42 },
				{ weight: 5, ideal: 61, overweight: 49 },
				{ weight: 6, ideal: 69, overweight: 55 },
			],
			type: 'dry',
		}
		const testSample = [...dataSample, secondDryFoodBrand]
		const processedData = fakeProcessedDryData(testSample)

		calculator.catWeight = 4
		calculator.catShape = 'ideal'
		expect(calculator.getResult(processedData)).toBe((50 + 53) / 2)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		expect(calculator.getResult(processedData)).toBe((47 + 49) / 2)
	})

	// FIXME round to one decimal
	it('recommends for one wet brand', () => {
		const { calculator } = mockup()
		const processedDryData = fakeProcessedDryData(dataSample)
		const processedWetData = fakeProcessedWetData(dataSample)
		const testSample = [...processedDryData, ...processedWetData]

		calculator.catWeight = 4
		calculator.catShape = 'ideal'
		const result1 = (1 - 1 / 1.5) * 50
		expect(calculator.getResult(testSample)).toBe(result1)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		const result2 = (1 - 1 / 2.5) * 47
		expect(calculator.getResult(testSample)).toBe(result2)
	})

	// FIXME test picking two wet food packs
})
