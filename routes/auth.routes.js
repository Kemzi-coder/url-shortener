import {Router} from 'express'
import AuthController from '../AuthController.js'
import {check} from 'express-validator'

const router = Router()

// register
router.post('/register', [
	check('email', 'Некорректный email').isEmail(),
	check('password', 'Minimum password length - 6 characters').isLength({min: 6})
], AuthController.register)

// login
router.post('/login', [
	check('email', 'Некорректный email').normalizeEmail().isEmail(),
	check('password', 'Введите пароль').exists()
], AuthController.login)


export default router
