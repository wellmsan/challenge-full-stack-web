import AbstractController from './AbstractController'
import StudentRepository from '../repositories/StudentRepository'

const repository = new StudentRepository()

class StudentController extends AbstractController {
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

export default StudentController