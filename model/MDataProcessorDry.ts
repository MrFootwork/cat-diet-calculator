import RawFoodBrand from '~~/model/IFoodBrand'
import PolynomialRegression from 'ml-regression-polynomial'

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

	// FIXME polynomial regression for value completion
	// npm package: ml-regression-polynomial
	// https://www.npmjs.com/package/ml-regression-polynomial
	processData(dataFromDB: RawFoodBrand[]) {
		this._data = dataFromDB.filter(brand => {
			return brand.type === 'dry'
		})

		const validWeights = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7]

		this._data.forEach((brand, i) => {
			const recommendations = brand.recommendations
			const weights = recommendations.map(tip => tip.weight)
			const ideals = recommendations.map(tip => tip.ideal)
			const degree = 2

			const regressionIdeal = new PolynomialRegression(weights, ideals, degree)

			// add enriched data for missing weights
			validWeights.forEach(validWeight => {
				if (recommendations.map(tip => tip.weight).includes(validWeight)) return

				recommendations.push({
					weight: validWeight,
					ideal: regressionIdeal.predict(validWeight),
				})
			})

			this._data[i].recommendations = recommendations.sort(
				(a, b) => a.weight - b.weight
			)
		})

		return this._data
	}
}
