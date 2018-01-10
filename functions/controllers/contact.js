const express = require('express');
const functions = require('firebase-functions');
const sendgrid = require('../lib/sendgrid.js');
const mailchimp = require('../lib/mailchimp.js');

module.exports = function() {
    const app = express();
    //  Newsletter form
    app.post('/', (req, res) => {
        let errorMessage = null;
    
        // User input validation
        // TODO: change clientside field_title to field_name
        let { 
            field_email: email, 
            field_title: name, 
            field_phone: phone, 
            field_userComment: comment,
            field_yesnewsletter: signup,
        } = req.body;

        if(!email) {
            errorMessage = 'An email is required';
        }
        if(!name) {
            errorMessage = 'A name is required';
        }
        if(!comment) {
            errorMessage = 'A comment is required';
        }

        if(errorMessage) {
            res.status(400).send(errorMessage);
            return;
        } else {
            const message = `<h1>New PINT Contact Form Submission</h1>
            <h3>Name</h3> 
            <p>${name}<p>
            
            <h3>Phone</h3>
            <p>${phone}</p>
            
            <h3>Email</h3>
            <p>${email}</p>
            
            <h3>Message</h3>
            <p>${comment}</p>
            `;
            const subject = `New PINT Contact Form Submissions ${name} (${email})`;
            const tasks = [
                sendgrid.send({ subject, message}),
            ];
            if(signup) {
                tasks.push(mailchimp.subscribe({name, email}));
            }

            Promise.all(tasks)
            .then((result) => {
                res.send('<h2>Thanks for reaching out</h2><p>We\'ll be in touch shortly.</p>');
            })
            .catch((error) => {
                res.send(error);
            });
        }
    })
    return app;
};