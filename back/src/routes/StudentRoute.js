import { Router } from 'express';
import StudentController from '../controllers/StudentController'

/* eslint-disable new-cap */
const routes = Router();
/* eslint-enable new-cap */

const controller = new StudentController()

/**
 * This function used for list or get by id.
 * @route GET /students/id?
 * @group Student
 * @param { integer } page.query - Página a exbir. Ex. 1
 * @param { integer } perPage.query.required - Qtd. Registros por página. Max: 25
 * @returns { object } 200 - Return JSON results
 * @returns { Error }  401 - Invalid Login!
 */
routes.get('/:id?', controller.list);

/**
 * This function used for create register.
 * @route POST /students/
 * @group Student
 * @param { Student.model } body.body.required
 * @returns { object } 200 - Return JSON with success mesage
 * @returns { Error }  401 - Invalid Login!
 */
routes.post('/', controller.create);

/**
 * This function used for update register by id.
 * @route PUT /students/id
 * @group Student
 * @param { integer } id.query.required - Id do objeto a editar
 * @returns { object } 200 - Return JSON result
 * @returns { Error }  401 - Invalid Login!
 */
routes.put('/:id', controller.update);

/**
 * This function used for list or get by id.
 * @route DELETE /students/id
 * @group Student
 * @param { integer } id.query.required - Id do objeto a excluir
 * @returns { object } 200 - Return JSON with success mesage
 * @returns { Error }  401 - Invalid Login!
 */
routes.delete('/:id', controller.delete);

export default routes;
