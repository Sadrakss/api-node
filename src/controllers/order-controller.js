'use strict'

const repository = require('../repositories/order-repository')
const guid = require('guid')

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'failed to process your request'
        })
    }

}
exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({
            message: 'Order successfully registered'
        })
    }
    catch (e) {
        res.status(500).send({
            message: 'Failed to save order'
        })
    }
}