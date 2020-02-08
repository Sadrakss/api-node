'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    Product.find({ active: true },
        'title price slug')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    },
        'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id,
        'title description price slug tags').then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        },
            'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}

exports.post = (req, res, next) => {
    let product = new Product(req.body)
    // product.title = req.body.title
    product.save()
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
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price
        }
    }).then(data => {
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
    Product
        .findOneAndRemove(req.body.id, {
        }).then(data => {
            res.status(200).send({
                message: 'Product successfully deleted'
            })
        }).catch(err => {
            res.status(400).send({
                message: 'Product not deleted',
                data: err
            })
        })
}