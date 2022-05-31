/**
 * Rounds a number type value to a given precision.
 * @param value A JavaScript number value, to be rounded.
 * @param precision A JavaScript number value, to specify the precision to round.
 */
function round(value: number, precision: number): number {
	var multiplier = Math.pow(10, precision || 0)
	return Math.round(value * multiplier) / multiplier
}

export default round
