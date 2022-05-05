import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

// Heroku Config Var Value
const uri = process.env.MONGODB_URI

export default async (req: IncomingMessage, res: ServerResponse) => {
	// hello?search=123
	// {search: 123}
	const queryObject = url.parse(req.url as string, true).query
	let data = { data: [{ data: '' }] }

	// test heroku env value
	console.log(uri)
	// FIXME connect DB to this app

	const { search } = queryObject
	if (search) {
		data = await $fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
	}
	// lazy writeHead: usually you would need to catch a 404
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.write(JSON.stringify(data))
	res.end()
}

// MongoDB connection string
// mongodb+srv://pandau:<password>@cat-diet-calculator.pdnkg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
