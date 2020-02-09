'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

exports.get = (req, res, next) => {
    repository.get()
        // Product.find({ active: true },
        //     'title price slug')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        // Product.findOne({
        //     slug: req.params.slug,
        //     active: true
        // },
        //     'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        // Product.findById(req.params.id,
        //     'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        // Product
        //     .find({
        //         tags: req.params.tag,
        //         active: true
        //     },
        //         'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.post = (req, res, next) => {

    // if the data is invalid
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'The title must contain at least 3 characters')
    contract.hasMinLen(req.body.slug, 3, 'The slug must contain at least 3 characters')
    contract.hasMinLen(req.body.description, 3, 'The description must contain at least 3 characters')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    repository.create(req.body)
        // let product = new Product(req.body)
        // product.title = req.body.title
        // product.save()
        .then(x => {
            res.status(201).send({ message: 'Product successfully registered' })
        })
        .catch(err => {
            res.status(400).send({
                message: 'Product not registered',
                data: err
            })
        })

}

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        // Product.findByIdAndUpdate(req.params.id, {
        //     $set: {
        //         title: req.body.title,
        //         description: req.body.description,
        //         slug: req.body.slug,
        //         price: req.body.price
        //     }
        // })
        .then(data => {
            res.status(200).send({
                message: 'Product successfully update'
            })
        }).catch(err => {
            res.status(400).send({
                message: 'Product not update',
                data: err
            })
        })
}

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
        // Product
        //     .findOneAndRemove(req.body.id, {
        //     })
        .then(data => {
            res.status(200).send({
                message: 'Product successfully deleted'
            })
        })
        .catch(err => {
            res.status(400).send({
                message: 'Product not deleted',
                data: err
            })
        })
}