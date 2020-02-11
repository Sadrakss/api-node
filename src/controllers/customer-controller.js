'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
// const emailService = require('../services/email-service')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        const msg = {
            to: 'sadrakss@outlook.com.br',
            from: 'sadrakss@outlook.com.br',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          }
          sgMail.send(msg);


            // emailService.send(
            //     req.body.email, 'Bem vindo ao Node Store',
            //     global.EMAIL_TMPL.replace('{0}', req.body.name))
 

        

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