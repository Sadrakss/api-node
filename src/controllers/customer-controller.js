'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')

exports.post = async (req, res, next) => {

    // if the data is invalid
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, 'The name must contain at least 3 characters')
    contract.isEmail(req.body.email, 3, 'Invalid email')
    contract.hasMinLen(req.body.password, 3, 'The password must contain at least 3 characters')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Client successfully registered'
        })
    }
    catch (e) {
        res.status(500).send({
            message: 'Failed to save client'
        })
    }
}


// my account
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