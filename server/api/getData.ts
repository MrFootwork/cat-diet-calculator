import type { IncomingMessage, ServerResponse } from 'http'

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

export default async (req: IncomingMessage, res: ServerResponse) => {
	// FIXME Test all CRUD operations
	// FIXME write api concept
	// OOP in vue tips
	// https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/
	let data = []
	data = await fetchMongo()

	// lazy writeHead: usually you would need to catch a 404
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.write(JSON.stringify(data))
	res.end()
}

async function fetchMongo() {
	const uri = process.env.MONGODB_URI
	const mongoClient: MongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('food')
		// TODO parallelize both promises
		const dry = await db.collection('dry').find({}).toArray()
		const wet = await db.collection('wet').find({}).toArray()

		return [...dry, ...wet]
	} catch (e) {
		console.error('could not read from database. ', e)
	} finally {
		await mongoClient.close()
	}
}

// TODO polynomial regression for value completion
// npm package: js-polynomial-regression
