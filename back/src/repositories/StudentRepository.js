import Student from '../models/Student'
import AbstractRepository from './AbstractRepository'

class StudentRepository extends AbstractRepository {
    constructor() {
        super(Student)
    }

}

export default StudentRepository