import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository'

class JWTUtils {
    constructor() {
    }

    static check(token) {
        let status
        if (!token) return { auth: false, status: 401, message: 'No token provided!' }
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                status = { auth: false, status: 500, message: 'Failed to authenticate token!' }
            } else {
                // Compara token do Payload com token do usuário
                const payload = jwt.decode(token, process.env.SECRET)
                if (payload.type === 'user') {
                    let userReq = {
                        token: payload.token
                    }
                    const user = new UserRepository().list(userReq)
                    if (!user) {
                        status = { auth: false, status: 500, message: 'Failed to authenticate token!' }
                    } else {
                        status = { auth: true, status: 200, message: 'Loged!' }
                    }
                }

            }
        })
        return status
    }

    static sign(payload) {
        let tokenSign
        if (payload.type === 'user') {
            tokenSign = jwt.sign({ token: payload.token, type: payload.type, userName: payload.userName }, process.env.SECRET, {
                expiresIn: '24h'
            })
        }
        if (payload.type === 'client') {
            tokenSign = jwt.sign({ token: token, type: type }, process.env.SECRET, {
                expiresIn: '87600h'
            })
        }
        return tokenSign
    }

    static decode(token) {
        return jwt.decode(token, process.env.SECRET)
    }

}

export default JWTUtils