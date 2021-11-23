import express from 'express'
import mongoose from 'mongoose'
import {mongoURI} from './private.js'
import authRouter from './routes/auth.routes.js'
import linkRouter from './routes/link.routes.js'
import redirectRouter from './routes/redirect.routes.js'
import path from 'path'

const app = express()
const PORT = process.env.PORT ?? 5000

const __dirname = path.resolve()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

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
