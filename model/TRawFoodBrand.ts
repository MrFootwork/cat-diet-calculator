type RawFoodBrand = {
	_id: string
	name: string
	recommendations: {
		weight: number
		ideal: number
		overweight: number
	}[]
	type: string
}
export default RawFoodBrand
