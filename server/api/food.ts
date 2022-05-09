import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

import { MongoClient } from 'mongodb'

// if depreciation warnings try
// new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// more info: https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html

async function main() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */

	// Heroku Config Var Value
	const uri = process.env.MONGODB_URI
	// real connection string
	// const uri =
	// 	'mongodb+srv://pandau:lindaLINDA1206%3FCatDietCalculator@cat-diet-calculator.pdnkg.mongodb.net/cat-diet-calculator?retryWrites=true&w=majority'

	const client = new MongoClient(uri)

	console.log(uri)
	// FIXME connect DB to this app

	try {
		await client.connect()

		await listDatabases(client)
	} catch (e) {
		console.error(e)
	} finally {
		await client.close()
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
