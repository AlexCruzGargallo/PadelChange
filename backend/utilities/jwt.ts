import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class Jwt {
    public static secret = process.env.JWT_SECRET

    public static assertSecret(): void {
        if (!Jwt.secret) {
            throw new Error('Make sure u have defined JWT_SECRET in your .env')
        }
    }

    public static sign(payload: any) {
        try {
            Jwt.assertSecret()

            return jwt.sign(payload, Jwt.secret!, {
                expiresIn: 604800,
            })
        } catch (err) {
            console.error(err)
        }
    }

    public static verify(token: string) {
        try {
            Jwt.assertSecret()

            return jwt.verify(token, Jwt.secret!)
        } catch (err) {
            console.error(err)
        }
    }
}
export default Jwt
