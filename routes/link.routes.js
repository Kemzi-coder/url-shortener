import {Router} from 'express'
import LinkController from '../LinkController.js'
import authMiddleware from '../middleware/auth.middleware.js'
import {check} from 'express-validator'

const router = Router()

router.post('/generate', [
	check('from', 'Field is empty').notEmpty()
], authMiddleware, LinkController.generate)

router.get('/', authMiddleware, LinkController.getAll)

router.get('/:id', authMiddleware, LinkController.getById)

export default router
