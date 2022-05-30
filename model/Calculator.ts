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
	// more reactive input properties are embedded in brands of _data

	// output
	// FIXME add wet food subtraction
	get result(): number {
		const selectedDryBrands = this._data.filter(brand => {
			return brand.type === 'dry' && brand.selected
		})

		const sumOfSelectedDryBrands = selectedDryBrands.reduce((sum, brand) => {
			return sum + brand.selectionValue
		}, 0)

		const recommendedFoodQuantity = selectedDryBrands.reduce(
			(average, brand): number => {
				const brandRatio: number = brand.selectionValue / sumOfSelectedDryBrands

				const brandQuantity: number = brand.recommendations.filter(
					recommendation => recommendation.weight === this.catWeight
				)[0][this.catShape]

				return average + brandRatio * brandQuantity
			},
			0
		)

		return recommendedFoodQuantity
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
}
