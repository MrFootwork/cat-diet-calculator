export default class DataProcessorWet {
	private _data
	private static instance: DataProcessorWet

	private constructor() {}

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
	processData(dataFromDB) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'wet'
		})
	}
}
