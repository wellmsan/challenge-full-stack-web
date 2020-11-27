import {validationResult} from 'express-validator';

class AbstractController { 
    
    constructor() {
        if(new.target === AbstractController){
            throw new TypeError("Cannot construct Abstract instances directly")
        }
    }

    list(req, res, repository){
        if(!req.params.id) {
            repository.list(req.query)
            .then(async (data) => {
                res.status(200).json(data);
            }, (e) => {
                res.status(500).send({message: 'Error List: ' + e.message});
            });
        } else {
            repository.get(req.params.id)
            .then(async (data) => {
                res.status(200).json(data);
            }, (e) => {
                res.status(500).send({message: 'Error Get: ' + e.message});
            });
        }
    }

    create(req, res, repository) {
        const {errors} = validationResult(req)
        if (errors.length > 0) {
            res.status(400).send({message: 'Error validations: ' + errors})
        }
        repository.create(req.body).then(data => {
            res.status(201).send({message: 'Registro cadastrado!', data: data})
        })
        .catch(e => {
            res.status(500).send({message: 'Error Create: ' + e.message})
        })

    }

    update(req, res, repository) {
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            res.status(400).send({message: 'Error validations: ' + errors})
        }
        repository.update(req.params.id, req.body)
        .then((data) => {
            res.status(201).send({message: 'Registro atualizado!'})
        })
        .catch(e => {
            res.status(500).send({message: 'Error Update: ' + e.message})
        })
    }

    delete(req, res, repository) {
        repository.delete(req.params.id)
        .then(() => {
            res.status(201).send({message: 'Registro excluído!'});
        })
        .catch(e => {
            res.status(500).send({message: 'Error Delete: ' + e.message})
        })
    }

}

export default AbstractController