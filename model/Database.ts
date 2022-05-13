/****************************************************************
 *  Database
 ****************************************************************
 *  * Singleton
 *  * can return raw data
 *
 *
 *
 ***************************************************************/
import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default class Database {
	readonly foodRecommendations: string
	private static instance: Database

	private constructor() {
		this.foodRecommendations = 'constructor'
	}

	static async getInstance() {
		if (Database.instance) Database.instance

		Database.instance = new Database()
		this.foodRecommendations = await fetchDB()
	}

	private async fetchDB() {
		const uri = process.env.MONGODB_URI || ''
		const mongoClient: MongoClient = new MongoClient(uri)

		try {
			await mongoClient.connect()
			const db = mongoClient.db('food')
			// get all collections
			// fetch all collections
			return 'test'
		} catch (e) {
			console.error('could not read from database. ', e)
		} finally {
			await mongoClient.close()
		}

		// try {
		// 	await mongoClient.connect()
		// 	const db = mongoClient.db('food')
		// 	const collection = await db.collection('dry').find({}).toArray()
		// 	return collection
		// } catch (e) {
		// 	console.error('could not read from database. ', e)
		// } finally {
		// 	await mongoClient.close()
		// }
	}
}
