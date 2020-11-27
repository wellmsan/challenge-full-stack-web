import User from '../models/User'
import AbstractRepository from './AbstractRepository'
import jwt from '../lib/JWTUtils'

class UserRepository extends AbstractRepository {
    constructor() {
        super(User)
    }

    list(req) {
        let tokenUser
        let params

        if (req != null) {
            params = {
                ...req,
            }
        }
        if (req.query != null) {
            params = {
                ...req.query,
            }
        }

        if (typeof (req.headers) == undefined) {
            tokenUser = jwt.decode(req.headers['x-access-token']).token
            delete req.query.token

            params.token = tokenUser
        }
        return super.list(params)
    }

}

export default UserRepository