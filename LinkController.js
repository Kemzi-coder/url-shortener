import Link from './models/Link.js'
import shortid from 'shortid'
import {baseUrl} from './private.js'
import {validationResult} from 'express-validator'

class LinkController {
	async generate(req, res) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Link is incorrect'
				})
			}

			const {from} = req.body

			const code = shortid.generate()

			const existing = await Link.findOne({from})

			if (existing) {
				return res.json({link: existing})
			}

			const to = baseUrl + '/t/' + code

			const link = new Link({
				code, to, from, owner: req.user.userId
			})

			await link.save()

			res.status(201).json({link})
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}

	async getAll(req, res) {
		try {
			const links = await Link.find({owner: req.user.userId})
			res.json(links)
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}

	async getById(req, res) {
		try {
			const link = await Link.findById(req.params.id)
			res.json(link)
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}
}

export default new LinkController()
