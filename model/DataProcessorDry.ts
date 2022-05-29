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

	// TODO enrich data
	processData(dataFromDB) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'dry'
		})
	}
}
