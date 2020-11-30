import AbstractController from './AbstractController'
import UserRepository from '../repositories/UserRepository'

const repository = new UserRepository()

class UserController extends AbstractController {
    constructor() {
        super()
    }

    list(req, res) {
        super.list(req, res, repository)
    }

    create(req, res) {
        super.create(req, res, repository)
    }

    update(req, res) {
        super.update(req, res, repository)
    }

    delete(req, res) {
        super.delete(req, res, repository)
    }

}

export default UserController