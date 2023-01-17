import RawFoodBrand from '~~/model/IFoodBrand'
import PolynomialRegression from 'ml-regression-polynomial'

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

		const validWeights = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7]

		this._data.forEach((brand, i) => {
			const recommendations = brand.recommendations
			const weights = recommendations.map(tip => tip.weight)
			const ideals = recommendations.map(tip => tip.ideal)
			const overweights = recommendations.map(tip => tip.overweight)
			const degree = 2

			const regressionIdeal = new PolynomialRegression(weights, ideals, degree)
			const regressionOverweight = new PolynomialRegression(
				weights,
				overweights,
				degree
			)

			// add enriched data for missing weights
			validWeights.forEach(validWeight => {
				if (recommendations.map(tip => tip.weight).includes(validWeight)) return

				const predictIdeal =
					Math.round(
						(regressionIdeal.predict(validWeight) + Number.EPSILON) * 100
					) / 100

				const predictOverweight =
					Math.round(
						(regressionOverweight.predict(validWeight) + Number.EPSILON) * 100
					) / 100

				recommendations.push({
					weight: validWeight,
					ideal: predictIdeal,
					overweight: predictOverweight,
				})
			})

			this._data[i].recommendations = recommendations.sort(
				(a, b) => a.weight - b.weight
			)
		})

		return this._data
	}
}
