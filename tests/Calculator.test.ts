import { describe, expect, it } from 'vitest'
import helpers from '~~/model/Helper'

// import DataProcessorWet from '~~/model/MDataProcessorWet'
// import DataProcessorDry from '~~/model/MDataProcessorDry'
import DataProcessor from '~~/model/MDataProcessor'
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
		_id: '6292815a8fc792107f9fbe10',
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
/**
 * Provides instances with initial mocked dataSample.
 */
const mockup = function () {
	const processor = DataProcessor.getInstance()

	const brandsWet = processor.processData('wet', dataSample)
	const brandsDry = processor.processData('dry', dataSample)

	const calculator = Calculator.getInstance()
	return { brandsWet, brandsDry, calculator }
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
	it('returns same single instance each time', () => {
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

	it('one dry brand', () => {
		const { calculator } = mockup()
		const processedData = fakeProcessedDryData(dataSample)

		expect(calculator.getResult(processedData)).toBe(50)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		expect(calculator.getResult(processedData)).toBe(47)
	})

	it('two dry brands', () => {
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
		const expectedResult1 = helpers.round((50 + 53) / 2, 1)
		expect(calculator.getResult(processedData)).toBe(expectedResult1)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		const expectedResult2 = helpers.round((47 + 49) / 2, 1)
		expect(calculator.getResult(processedData)).toBe(expectedResult2)
	})

	it('one wet brand', () => {
		const { calculator } = mockup()
		const processedDryData = fakeProcessedDryData(dataSample)
		const processedWetData = fakeProcessedWetData(dataSample)
		const testSample = [...processedDryData, ...processedWetData]

		calculator.catWeight = 4
		calculator.catShape = 'ideal'
		const result1 = helpers.round((1 - 1 / 1.5) * 50, 1)
		expect(calculator.getResult(testSample)).toBe(result1)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		const result2 = helpers.round((1 - 1 / 2.5) * 47, 1)
		expect(calculator.getResult(testSample)).toBe(result2)
	})

	it('two wet brands', () => {
		const { calculator } = mockup()
		const extraWet = {
			_id: '6292815a8fc792107f9fbe09',
			name: 'Another Wet Food Brand',
			recommendations: [
				{ weight: 3, ideal: 2, overweight: 1 },
				{ weight: 4, ideal: 3, overweight: 2 },
				{ weight: 5, ideal: 4, overweight: 3 },
				{ weight: 6, ideal: 5, overweight: 4 },
			],
			type: 'wet',
		}
		const processedDryData = fakeProcessedDryData(dataSample)
		const processedWetData = fakeProcessedWetData([...dataSample, extraWet])
		const testSample = [...processedDryData, ...processedWetData]

		calculator.catWeight = 4
		calculator.catShape = 'ideal'
		const result1 = helpers.round(50 * (1 - 1 / 1.5 - 1 / 3), 1)
		const calculatorResult = calculator.getResult(testSample)
		expect(calculatorResult).toBeCloseTo(result1)

		calculator.catWeight = 5
		calculator.catShape = 'overweight'
		const result2 = helpers.round(47 * (1 - 1 / 2.5 - 1 / 3), 1)
		expect(calculator.getResult(testSample)).toBeCloseTo(result2)
	})
})

describe.todo('result() with invalid data, e.g. missing tip')
