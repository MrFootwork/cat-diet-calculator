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

	// TODO enrich data
	processData(dataFromDB) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'wet'
		})
	}
}
