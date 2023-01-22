interface Recommendation {
	weight: number
	ideal: number
	overweight: number
}

interface FoodBrand {
	_id: string
	name: string
	recommendations: Recommendation[]
	type: 'dry' | 'wet'
	isMixPortion?: boolean
	mixPortion?: number
	color: string
	image?: string
}
export default FoodBrand
