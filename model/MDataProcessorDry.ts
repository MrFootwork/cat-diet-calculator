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

		this._data.forEach(brand => {
			const recommendations = brand.recommendations
			const weights = recommendations.map(tip => tip.weight)
			const ideals = recommendations.map(tip => tip.ideal)
			const degree = 2

			const regressionIdeal = new PolynomialRegression(weights, ideals, degree)

			brand.recommendations.forEach(recommendation => {
				if (validWeights.includes(recommendation.weight)) {
					console.log(`${recommendation.weight} is valid`)
				} else {
					console.log(`${recommendation.weight} has to be added`)
				}
			})
			// brand.recommendations.push({ weight: 7, ideal: 69, overweight: 55 })
		})

		return this._data
	}
}
