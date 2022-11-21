import { Request, Response, NextFunction } from 'express'
import Jwt from '../utilities/jwt'

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (!authToken) {
        res.status(401).send('El token de autenticación no ha sido enviado.')
        return
    }
    const token = authToken.split(' ')[1]
    let temp = Jwt.verify(token)
    if (!temp) {
        res.status(403).send('El token no es válido.')
        return
    }

    req.body.tokenPayload = temp
    next()
}


export default authenticateToken