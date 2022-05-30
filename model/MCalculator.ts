import Database from '~~/model/MDatabase'
import DataProcessorDry from '~~/model/MDataProcessorDry'
import DataProcessorWet from '~~/model/MDataProcessorWet'

type FoodBrand = {
	_id: string
	name: string
	recommendations: {
		weight: number
		ideal: number
		overweight: number
	}[]
	type: string
	isMixPortion: boolean
	mixPortion: number
}

// TODO create cat profiles
export default class Calculator {
	// properties
	private _data: FoodBrand[] = []
	private static instance: Calculator
	private static db: Database
	private static dryProcessor: DataProcessorDry
	private static wetProcessor: DataProcessorWet

	private constructor() {
		this.catWeight = 4
		this.catShape = 'ideal'
		Calculator.db = Database.getInstance()
		Calculator.dryProcessor = DataProcessorDry.getInstance()
		Calculator.wetProcessor = DataProcessorWet.getInstance()
	}

	// input
	public catWeight: number
	public catShape: string
	// more reactive input properties are embedded in brands of _data e.g.,
	// isMixPortion
	// mixPortion

	// output
	// FIXME dependency inject this._data
	get result(): number {
		const selectedDryBrands = this._data.filter(brand => {
			return brand.type === 'dry' && brand.isMixPortion
		})

		const dryFoodMixPortionSum = selectedDryBrands.reduce((sum, brand) => {
			return sum + brand.mixPortion
		}, 0)

		const dryFoodMixDaily = selectedDryBrands.reduce(
			(currentAverage, brand): number => {
				// share of "current brand / mixed food"
				const brandMixRatio: number = brand.mixPortion / dryFoodMixPortionSum

				// (catWeight, catShape) => daily quantity for current brand
				const brandQuantity: number = brand.recommendations.filter(
					recommendation => recommendation.weight === this.catWeight
				)[0][this.catShape]

				return currentAverage + brandMixRatio * brandQuantity
			},
			0
		)

		// FIXME calculate the quantity subtracted from dryFoodMixDaily
		const wetFoodMixEquivalent = 0

		return dryFoodMixDaily
	}

	// getters
	get allBrands(): FoodBrand[] {
		return this._data || []
	}

	brandsOfType(foodType: string): FoodBrand[] {
		return this._data.filter(brand => brand.type === foodType) || []
	}

	static getInstance(): Calculator {
		if (!Calculator.instance) {
			Calculator.instance = new Calculator()
		}
		return Calculator.instance
	}

	// methods
	async refresh() {
		await Calculator.db.fetchMongo()
		const dryData = Calculator.dryProcessor.processData(Calculator.db.data)
		const wetData = Calculator.wetProcessor.processData(Calculator.db.data)
		const allBrands = [...dryData, ...wetData]

		// data enrichment for ui
		// TODO keep data: read old states and keep them with updated data
		allBrands.map(brand =>
			Object.defineProperties(brand, { isMixPortion = false, mixPortion = 0 })
		)

		this._data = allBrands
	}
}
