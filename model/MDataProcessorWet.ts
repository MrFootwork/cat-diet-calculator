import RawFoodBrand from 'model/TRawFoodBrand'

export default class DataProcessorWet {
	private _data: RawFoodBrand[]
	private static instance: DataProcessorWet

	private constructor() {
		this._data = []
	}

	static getInstance() {
		if (!DataProcessorWet.instance) {
			DataProcessorWet.instance = new DataProcessorWet()
		}
		return DataProcessorWet.instance
	}

	get data() {
		return this._data
	}

	// TODO polynomial regression for value completion
	// npm package: js-polynomial-regression
	// https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/
	processData(dataFromDB: RawFoodBrand[]) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'wet'
		})
		return this._data
	}
}
