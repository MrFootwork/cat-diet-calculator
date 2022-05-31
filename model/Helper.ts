/**
 * Rounds a number type value to a given precision.
 * @param value A JavaScript number value, to be rounded.
 * @param precision A JavaScript number value, to specify the precision to round.
 */
const helpers = {
	round: function (value: number, precision: number): number {
		var multiplier = Math.pow(10, precision || 0)
		return Math.round(value * multiplier) / multiplier
	},

	test: function () {
		return 'test'
	},
}

export default helpers
