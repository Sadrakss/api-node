'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')


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


exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'failed to process your request'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'failed to process your request'
        })
    }
}
exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    }
    catch (e) {
        res.status(500).send({
            message: 'failed to process your request'
        })
    }
}

exports.post = async (req, res, next) => {

    // if the data is invalid
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'The title must contain at least 3 characters')
    contract.hasMinLen(req.body.slug, 3, 'The slug must contain at least 3 characters')
    contract.hasMinLen(req.body.description, 3, 'The description must contain at least 3 characters')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Product successfully registered'
        })
    }
    catch (e) {
        res.status(500).send({
            message: 'Failed to save product'
        })
    }
}

exports.put = async (req, res, next) => {

    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Product successfully update'
        })
    }
    catch (e) {
        res.status(400).send({
            message: 'Product not update'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Product successfully deleted'
        })
    }
    catch (e) {
        res.status(400).send({
            message: 'Product not deleted',
            data: err
        })
    }

}