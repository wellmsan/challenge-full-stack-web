const sqs = require('sequelize-querystring')

class AbstractRepository {
    constructor(model) {
        if (new.target === AbstractRepository) {
            throw new TypeError("Cannot construct Abstract instances directly")
        }
        this.model = model
    }

    async list(params) {
        try {
            let order = params.order != null ? params.order : 'id'
            let sort = params.sort != null ? params.sort : 'DESC'

            delete params.order
            delete params.sort
            const paginate = this.getPagination(params)
            return await this.model.findAndCountAll({
                where: params.filter != null ? sqs.find(params.filter) : params,
                order: [
                    [order, sort]
                ],
                distinct: true, // Adicionado distinct para corrigir a contagem quando um model tem JOINS / Filhos
                include: [{ all: true, nested: false }],
                offset: paginate.offset,
                limit: paginate.perPage
            })
        } catch (e) {
            console.error(e)
            let message = "Ocorreu um problema ao tentar listar."
            throw new Error(message)
        }
    }

    async get(id) {
        return await this.model.findByPk(id, { include: [{ all: true, nested: false }] }).then(async (data) => {
            return await data.get()
        }).catch(e => {
            console.error(e.message)
            throw new Error("Ocorreu um problema ao buscar um registro.")
        })
    }

    async getBy(params) {
        return await this.model.findOne({
            where: params,
            include: [{ all: true, nested: false }]
        }).then(async (data) => {
            return await data.get()
        }).catch(e => {
            console.error(e.message)
            throw new Error("Ocorreu um problema ao buscar um registro.")
        })
    }

    async findAll(params) {
        try {
            let order = params.order != null ? params.order : 'id'
            let sort = params.sort != null ? params.sort : 'DESC'

            delete params.order
            delete params.sort
            return await this.model.findAll({
                include: [{ all: true, nested: true }],
                where: params,
                order: [
                    [order, sort]
                ],
            })
        } catch (e) {
            console.error(e.message)
            throw new Error("Ocorreu um problema ao tentar listar.")
        }
    }

    async create(data) {
        return await this.model.create(data, { include: [{ all: true, nested: true }] }).then(async (data) => {
            return await data.get()
        }).catch(e => {
            console.error(e)
            throw new Error("Não foi possível criar o registro.")
        })
    }

    async update(id, data) {
        return await this.model.update(
            data, {
            where: {
                id: id
            }
        }
        ).then(async (data) => {
            return true
        }).catch(e => {
            throw new Error(e.message)
        })
    }


    async delete(id) {
        return await this.model.destroy({
            where: {
                id: id
            }
        }).then(async (data) => {
            return true
        }).catch(e => {
            console.error(e.message)
            let message = ""

            if (e.message.toLowerCase().includes('conflict')) {
                message = "Não foi possível realizar a exclusão do registro por causa de um conflito de referência com outra tabela."
            } else {
                message = "Não foi possível realizar a exclusão do registro."
            }
            throw new Error(message)
        })
    }

    getPagination(params) {
        if (params) {
            let page = params.page != null ? parseInt(params.page) : 1
            let perPage = params.perPage != null ? params.perPage > 25 ? 25 : parseInt(params.perPage) : 25
            let offset = (page - 1) * perPage

            delete params.page
            delete params.perPage

            return {
                page: page,
                perPage: perPage,
                offset: offset
            }
        } else {
            return {
                page: 1,
                perPage: 25,
                offset: 0
            }
        }
    }

}

export default AbstractRepository
