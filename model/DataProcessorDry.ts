export default class DataProcessorDry {
	private _data
	private static instance: DataProcessorDry

	private constructor() {}

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
	processData(dataFromDB) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'dry'
		})
	}
}
