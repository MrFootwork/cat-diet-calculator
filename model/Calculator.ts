import Database from '~~/model/Database'
import DataProcessorDry from '~~/model/DataProcessorDry'
import DataProcessorWet from '~~/model/DataProcessorWet'

// FIXME create processor instances

export default class Calculator {
	// FIXME setup all required data
	private _dryFoodBrands
	private _wetFoodBrands
	private static instance: Calculator
	private static db: Database
	private static dryProcessor: DataProcessorDry
	private static wetProcessor: DataProcessorWet

	private constructor() {
		Calculator.db = Database.getInstance()
		Calculator.dryProcessor = DataProcessorDry.getInstance()
		Calculator.wetProcessor = DataProcessorWet.getInstance()
	}

	static getInstance() {
		if (!Calculator.instance) {
			Calculator.instance = new Calculator()
		}
		return Calculator.instance
	}
	// FIXME setter for all input variables

	// FIXME calculate
	async refresh() {
		await Calculator.db.fetchMongo()
		Calculator.dryProcessor.processData(Calculator.db.data)
		Calculator.wetProcessor.processData(Calculator.db.data)
		this._dryFoodBrands = Calculator.dryProcessor.data
		this._wetFoodBrands = Calculator.wetProcessor.data
		// dryFoodRatio.= dryProcessor.data.map(brand => 0)
	}

	get allBrands() {
		return [...this._dryFoodBrands, ...this._wetFoodBrands] || []
	}
	// FIXME getters for dry and wet
}
