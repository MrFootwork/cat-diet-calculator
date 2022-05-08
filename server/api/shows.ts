import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

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
