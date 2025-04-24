const { json } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Assortment, BasketProduct, Basket } = require('../models/models')
const basketController = require('./basketController')
const path = require('path')


class AssortmentController {
    async create(req, res, next) {
        try {
            const { type, name, available, costPerOne, unitsOfMeasurement, description, composition } = req.body
            const { image } = req.files
            let fileName = name + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const assortment = await Assortment.create({ type, name, available, costPerOne, unitsOfMeasurement, description, composition, image: fileName })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            return res.json(await Assortment.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.body
            const assortment = await Assortment.findOne({ where: { id: id } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllByName(req, res, next) {
        try {
            const { name } = req.body
            const assortment = await Assortment.findAll({ where: { name: name } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllByAvailable(req, res, next) {
        try {
            const { available } = req.body
            const assortment = await Assortment.findAll({ where: { available } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllByType(req, res, next) {
        try {
            const { type } = req.body
            const assortment = await Assortment.findAll({ where: { type: type } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllByTypeAndAvailable(req, res, next) {
        try {
            const { type, available } = req.body
            const assortment = await Assortment.findAll({ where: { type: type, available: available } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAllByTypeAndName(req, res, next) {
        try {
            const { type, name } = req.body
            const assortment = await Assortment.findAll({ where: { type: type, name: name } })
            return res.json(assortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    } 

    async deleteOneById(req, res, next) {
        try {
            const { id } = req.body
            const deleted = await Assortment.destroy({ where: { id: id } })
            await BasketProduct.destroy({ where: { assortmentId: id } })
            const updatedBaskets = await Basket.findAll()
            updatedBaskets.forEach(element => basketController.updateSum(element['id']))
            return res.json(deleted)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeTypeByName(req, res, next) {
        try {
            const { type, name } = req.body
            const updated = await Assortment.update({ type: type }, { where: { name: name } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNameByName(req, res, next) {
        try {
            const { oldName, newName } = req.body
            const updated = await Assortment.update({ name: newName }, { where: { name: oldName } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAvailableByName(req, res, next) {
        try {
            const { name } = req.body
            const product = await Assortment.findOne({ where: { name: name } })
            const updated = await Assortment.update({ available: !product.available }, { where: { name: name } })
            if (!product.available) {
                const product = await Assortment.findOne({ where: { name: name } })
                await BasketProduct.destroy({ where: { assortmentId: product['id'] } })
                const baskets = await Basket.findAll()
                baskets.forEach(element => basketController.updateSum(element['id']))
            }
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCostPerOneByName(req, res, next) {
        try {
            const { name, costPerOne } = req.body
            const product = await Assortment.findOne({ where: { name: name } })
            const updated = await Assortment.update({ costPerOne: costPerOne }, { where: { name: name } })
            await BasketProduct.update({ costPerOne: costPerOne }, { where: { assortmentId: product['id'] } })
            const baskets = await Basket.findAll()
            baskets.forEach(element => basketController.updateSum(element['id']))
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeDescriptionByName(req, res, next) {
        try {
            const { name, description } = req.body
            const updated = await Assortment.update({ description: description }, { where: { name: name } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCompositionByName(req, res, next) {
        try {
            const { name, composition } = req.body
            const updated = await Assortment.update({ composition: composition }, { where: { name: name } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async changeImageByName(req, res, next) {
        try {
            const { name } = req.body
            const { image } = req.files
            let fileName = name + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const updated = await Assortment.update({ image: fileName }, { where: { name: name } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAllById(req, res, next) {
        try {
            const { id, name, type, available, costPerOne, description, composition, unitsOfMeasurement } = req.body
            const { image } = req.files

            let fileName = name + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const updated = await Assortment.update({
                name: name, available: available, type: type, costPerOne: costPerOne,
                description: description, composition: composition, unitsOfMeasurement: unitsOfMeasurement, image: fileName
            }, { where: { id: id } })

            return res.json(updated)



        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAllTextById(req, res, next) {
        try {
            const { id, name, type, available, costPerOne, description, composition, unitsOfMeasurement } = req.body

            const updated = await Assortment.update({
                name: name, available: available, type: type, costPerOne: costPerOne,
                description: description, composition: composition, unitsOfMeasurement: unitsOfMeasurement,
            }, { where: { id: id } })

            return res.json(updated)



        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async getAssortmentByIds(req, res, next) {

        try {
            let { ids } = req.body
            let intIds = []
            ids = ids.split(' ')
            ids.map((id) => {
                intIds.push(Number(id))
            })
            let result = await Assortment.findAll({ where: { id: intIds } })
            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAssortmentByIdsFromBack(ids) {
        return await Assortment.findAll({ where: { id: ids } })
    }
}

module.exports = new AssortmentController()