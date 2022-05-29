import Database from '~~/model/Database'
import DataProcessorDry from '~~/model/DataProcessorDry'
import DataProcessorWet from '~~/model/DataProcessorWet'

export default class Calculator {
	// input
	public catWeight: number = 4
	public catShape: string = 'ideal'

	// output
	get result() {
		return this.catWeight * 3 * (this.catShape === 'ideal' ? 1 : 2)
	}

	// data from database
	private _data = []
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

	async refresh() {
		await Calculator.db.fetchMongo()
		Calculator.dryProcessor.processData(Calculator.db.data)
		Calculator.wetProcessor.processData(Calculator.db.data)
		const dryData = Calculator.dryProcessor.data
		const wetData = Calculator.wetProcessor.data
		const allBrands = [...dryData, ...wetData]

		// data enrichment for ui
		allBrands.forEach(brand => {
			brand.selected = false
			brand.selectionValue = 0
		})
		this._data = allBrands
	}

	get allBrands() {
		return this._data || []
	}
	brandsOfType(type) {
		return this._data.filter(brand => brand.type === type)
	}
}
