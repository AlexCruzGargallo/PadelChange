import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, default: 'user-image-default.png' },

    teams: [{ type: Schema.Types.ObjectId }],
})

export default mongoose.model('User', UserSchema)
