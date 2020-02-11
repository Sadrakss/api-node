'use strict'

const config = require('../config')
// const sendgrid = require('sendgrid')(config.sendgridKey)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


exports.send = async (to, subject, body) => {
    sgMail.send({
        to: to,
        from: 'sadrak@sadrak.com',
        subject: subject,
        html: body
    })
}