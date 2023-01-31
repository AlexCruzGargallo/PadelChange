import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    location: {type: String, default: ""},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, default: 'user-image-default.png' },
    admin: {type: Boolean, default: false},
    overall_rating:{type: Number, default: 0},
})

export default mongoose.model('User', UserSchema)


