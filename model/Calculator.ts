import Database from '~~/model/Database'
import DataProcessorDry from '~~/model/DataProcessorDry'
import DataProcessorWet from '~~/model/DataProcessorWet'

type FoodBrand = {
	_id: string
	name: string
	recommendations: {
		weight: number
		ideal: number
		overweight: number
	}[]
	type: string
	selected: boolean
	selectionValue: number
}

// TODO create cat profiles
export default class Calculator {
	// input
	public catWeight: number
	public catShape: string

	// output
	// FIXME do the real calculation
	get result() {
		const selectedDryBrands = this._data.filter(brand => {
			return brand.type === 'dry' && brand.selected
		})
		console.log('recommendation: ', selectedDryBrands)

		const sumOfSelectedDryBrands = selectedDryBrands.reduce((sum, brand) => {
			return sum + brand.selectionValue
		}, 0)
		console.log('sum of selected dry brands: ', sumOfSelectedDryBrands)

		return selectedDryBrands.reduce((brandAverage, brand) => {
			const brandRatio = brand.selectionValue / sumOfSelectedDryBrands

			const recommendedFoodAmount = brand.recommendations.filter(
				recommendation => recommendation.weight === this.catWeight
			)[0][this.catShape]

			console.log(brand, brandRatio, recommendedFoodAmount, this.catShape)

			return brandAverage + brandRatio * recommendedFoodAmount
		}, 0)
	}

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

	static getInstance(): Calculator {
		if (!Calculator.instance) {
			Calculator.instance = new Calculator()
		}
		return Calculator.instance
	}

	async refresh() {
		await Calculator.db.fetchMongo()
		Calculator.dryProcessor.processData(Calculator.db.data)
		Calculator.wetProcessor.processData(Calculator.db.data)
		const dryData = Calculator.dryProcessor.data
		const wetData = Calculator.wetProcessor.data
		const allBrands = [...dryData, ...wetData]

		// data enrichment for ui
		// TODO keep data: read old states and keep them with updated data
		allBrands.forEach(brand => {
			brand.selected = false
			brand.selectionValue = 0
		})
		this._data = allBrands
	}

	get allBrands(): FoodBrand[] {
		return this._data || []
	}
	brandsOfType(type): FoodBrand[] {
		return this._data.filter(brand => brand.type === type)
	}
}
