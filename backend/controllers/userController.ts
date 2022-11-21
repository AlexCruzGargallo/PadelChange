import { Request, Response } from 'express'
import bcrypt, { hash } from 'bcrypt'
import Utilities from '../utilities/utilities'
import User from '../models/UserSchema'
import Jwt from '../utilities/jwt'

class UserController {
    public async register(req: Request, res: Response) {
        try {
            let { firstName, lastName, email, password } = req.body

            // Parse First and Lastname
            let parsedFirstName = (firstName as string).toLowerCase()
            parsedFirstName = Utilities.capitalizeFirstLetter(parsedFirstName)

            let parsedLastName = (lastName as string).toLowerCase()
            let parsedLastNameArray = parsedLastName.split(' ')

            for (let i = 0; i < parsedLastNameArray.length; i++) {
                parsedLastNameArray[i] = Utilities.capitalizeFirstLetter(
                    parsedLastNameArray[i]
                )
            }

            parsedLastName = parsedLastNameArray.join(' ')

            // Validate user inputs
            if (!Utilities.emailValidation(email)) {
                throw new Error('El correo electrónico no es válido.')
            }

            if (!Utilities.passwordValidation(password)) {
                throw new Error('La contraseña no es válida.')
            }

            if (!Utilities.nameValidation(parsedFirstName)) {
                throw new Error('El nombre no es válido.')
            }
            req.body.firstName = parsedFirstName

            if (!Utilities.nameValidation(parsedLastName)) {
                throw new Error('El apellido no es válido.')
            }
            req.body.lastName = parsedLastName

            // Hash the user password
            const hashedPassword = await bcrypt.hash(password, 10)
            req.body.password = hashedPassword

            // Create Mongoose object
            const user = new User(req.body)
            await user.save()
            console.log(`User has been created`, user)

            res.send(user)
        } catch (err) {
            console.error(err)
            res.status(400).send(err)
        }
    }

    public async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body

            if (!Utilities.emailValidation(email)) {
                throw new Error('El correo electrónico no es válido.')
            }

            if (!Utilities.passwordValidation(password)) {
                throw new Error('La contraseña no es válida.')
            }

            let user = await User.findOne({ email: email }).select('-__v')

            if (!user) {
                throw new Error('El usuario no existe.')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new Error('La contraseña del usuario es incorrecta.')
            }

            let aux = JSON.parse(JSON.stringify(user))
            delete aux.password
            const accessToken = Jwt.sign(aux)
            delete aux._id

            res.send({
                accessToken: accessToken,
                user: aux,
            })
        } catch (err) {
            console.error(err)
            res.status(400).send(err)
        }
    }
}

export default UserController
