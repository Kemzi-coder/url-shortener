import express from 'express'
import mongoose from 'mongoose'
import {mongoURI} from './private.js'
import authRouter from './routes/auth.routes.js'
import linkRouter from './routes/link.routes.js'
import redirectRouter from './routes/redirect.routes.js'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

const startApp = async () => {
	try {
		await mongoose.connect(mongoURI)
		app.listen(PORT, () => {
			console.log('Server is working')
		})
	} catch (e) {
		console.log(e)
	}
}

startApp()
