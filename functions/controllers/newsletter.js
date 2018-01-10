const express = require('express');
const functions = require('firebase-functions');
const mailchimp = require('../lib/mailchimp.js');

module.exports = function() {
    
    const app = express();

    //  Newsletter form
    app.post('/', (req, res) => {
        console.log('in here');

        let errorMessage = null;
    
        // User input validation
        // TODO: change clientside field_title to field_name
        let { field_email: email, field_title: name } = req.body;

        if(!email) {
            errorMessage = 'An email is required';
        }
        if(!name) {
            errorMessage = 'A name is required';
        }
        if(errorMessage) {
            res.status(400).send(errorMessage);
            return;
        } else {
            mailchimp.subscribe({name, email})
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            });
        }
    });

    app.get('/', (req, res) => {
        console.log('in newsletter');
        res.send('newsletter');
    });
    return app;
};