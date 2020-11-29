import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository'

class JWTUtils {
    constructor() {
    }

    static check(token) {
        let status
        if (!token) return { auth: false, status: 401, message: 'No token provided!' }
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            console.log(err)
            if (err) {
                status = { auth: false, status: 500, message: 'Failed to authenticate token!' }
            } else {
                const payload = jwt.decode(token, process.env.SECRET)
                let userReq = {
                    id: payload.userId
                }
                const user = new UserRepository().list(userReq)
                console.log(user)
                if (!user) {
                    status = { auth: false, status: 500, message: 'Failed to authenticate token!' }
                } else {
                    status = { auth: true, status: 200, message: 'Loged!' }
                }
            }
        })
        return status
    }

    static sign(payload) {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: '24h'
        })
    }

    static decode(token) {
        return jwt.decode(token, process.env.SECRET)
    }

}

export default JWTUtils