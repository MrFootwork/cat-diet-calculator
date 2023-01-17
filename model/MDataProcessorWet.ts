import RawFoodBrand from '~~/model/IFoodBrand'

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

	// FIXME polynomial regression for value completion
	// npm package: ml-regression-polynomial
	// https://www.npmjs.com/package/ml-regression-polynomial
	processData(dataFromDB: RawFoodBrand[]) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'wet'
		})
		return this._data
	}
}
