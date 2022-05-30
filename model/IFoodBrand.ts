interface FoodBrand {
	_id: string
	name: string
	recommendations: {
		weight: number
		ideal: number
		overweight: number
	}[]
	type: string
	isMixPortion?: boolean
	mixPortion?: number
}
export default FoodBrand
