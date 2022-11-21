import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const mongodb_uri = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        if (!mongodb_uri) {
            throw new Error(
                'Mongodb URI was not provided. Make sure that you declare MONGODB_URI in your .env file.'
            )
        }

        await mongoose.connect(mongodb_uri)

        console.log(`DB successfully connected to ${mongodb_uri}`)
    } catch (error: any) {
        console.error('Could not connect to DB: ', error.message)
        console.log(
            'Make sure MongoDB is installed and running (https://www.mongodb.com/docs/manual/installation/) and then set the MONGODB_URI in your .env file.'
        )
    }
}

export default connectDB
