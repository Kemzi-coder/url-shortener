import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	links: {
		type: mongoose.Types.ObjectId,
		ref: 'Link'
	}
})

const User = mongoose.model('User', userSchema)

export default User
