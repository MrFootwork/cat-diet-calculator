import RawFoodBrand from '~~/model/IFoodBrand'

export default class DataProcessorDry {
	private _data: RawFoodBrand[]
	private static instance: DataProcessorDry

	private constructor() {
		this._data = []
	}

	static getInstance() {
		if (!DataProcessorDry.instance) {
			DataProcessorDry.instance = new DataProcessorDry()
		}
		return DataProcessorDry.instance
	}

	get data() {
		return this._data
	}

	// TODO polynomial regression for value completion
	// npm package: js-polynomial-regression
	// https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/
	processData(dataFromDB: RawFoodBrand[]) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'dry'
		})
		return this._data
	}
}
