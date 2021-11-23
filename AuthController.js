import {validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import jwt from 'jsonwebtoken'
import {jwtSecret} from './private.js'

class AuthController {
	async register(req, res) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect registration data'
				})
			}

			const {email, password} = req.body
			const candidate = await User.findOne({email})

			if (candidate) {
				return res.status(400).json({message: 'This user already exists'})
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			const user = new User({email, password: hashedPassword})
			await user.save()

			res.status(201).json('User created')
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}

	async login (req, res) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect registration data'
				})
			}

			const {email, password} = req.body
			const user = await User.findOne({email})

			if (!user) {
				return res.status(400).json({message: 'User not found'})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({message: 'Wrong password, try again'})
			}

			const token = jwt.sign(
				{userId: user.id},
				jwtSecret,
				{expiresIn: '1h'}
			)

			res.json({token, userId: user.id})
		} catch (e) {
			res.status(500).json({message: 'Something went wrong!'})
		}
	}
}

export default new AuthController()
