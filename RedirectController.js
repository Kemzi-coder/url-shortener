import Link from './models/Link.js'

class RedirectController {
	async redirect(req, res) {
		try {
			const link = await Link.findOne({code: req.params.code})

			if (link) {
				link.clicks++
				await link.save()
				return res.redirect(link.from)
			}

			res.status(404).json('Link not found')
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}
}

export default new RedirectController()
