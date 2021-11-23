import {Router} from 'express'
import RedirectController from '../RedirectController.js'

const router = Router()

router.get('/:code', RedirectController.redirect)

export default router
