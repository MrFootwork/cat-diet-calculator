import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

import { MongoClient } from 'mongodb'
// read environment variables from .env for "npm run dev"
import { config } from 'dotenv'

async function main() {
	const uri = process.env.MONGODB_URI
	const mongoClient = new MongoClient(uri)

	try {
		await mongoClient.connect()
		await listDatabases(mongoClient)
	} catch (e) {
		console.error(e)
	} finally {
		await mongoClient.close()
	}
}

async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases()

	console.log('Databases:')
	databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

export default async (req: IncomingMessage, res: ServerResponse) => {
	await main().catch(console.error)

	let data = { data: [{ data: '' }] }
	const queryObject = url.parse(req.url as string, true)
	console.log('QueryObject: ', queryObject)
	data = await $fetch(`endpoint for mongodb food dry`)

	// lazy writeHead: usually you would need to catch a 404
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.write(JSON.stringify(data))
	res.end()
}

// TODO polynomial regression for value completion
// npm package: js-polynomial-regression
