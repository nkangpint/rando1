const express = require('express');
const functions = require('firebase-functions');
const sendgrid = require('./lib/sendgrid.js');
const mailchimp = require('./lib/mailchimp.js');
const app = express();
const Busboy = require('busboy');

// NEWSLETTER FORM
app.post('/api/newsletter', (req, res) => {
    parseReq(req, (formData) => {
        mailchimp.subscribe({name: formData.field_title, email: formData.field_email})
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.status(400).send(error);
        });
    });
});


function parseReq(req, cb) {
    const busboy = new Busboy({headers: req.headers});
    let formData = {};
    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        // We're just going to capture the form data in a JSON document.
        formData[fieldname] = val;
    });

    busboy.on('finish', () => {
        if(cb) {
            cb(formData);
        }
    });
    busboy.end(req.rawBody);
}

// CONTACT FORM
app.post('/api/contact', (req, res) => {
    parseReq(req, (formData) => {
        let errorMessage = null;

        // User input validation
        // TODO: change clientside field_title to field_name
        let { 
            field_email: email, 
            field_title: name, 
            field_phone: phone, 
            field_userComment: comment,
            field_yesnewsletter: signup,
        } = formData;
    
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
                sendgrid.send({ email, subject, message}),
            ];
            if(signup) {
                tasks.push(mailchimp.subscribe({name, email}));
            }
    
            Promise.all(tasks)
            .then((result) => {
                console.log('result',result);
                res.send('<h2>Thanks for reaching out</h2><p>We\'ll be in touch shortly.</p>');
            })
            .catch((error) => {
                console.log('error',error);
                res.send(error);
            });
        }
    });

    return;
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        let errorMessage = null;

        // User input validation
        // TODO: change clientside field_title to field_name
        let { 
            field_email: email, 
            field_title: name, 
            field_phone: phone, 
            field_userComment: comment,
            field_yesnewsletter: signup,
        } = fields;
    
        if(!email) {
            errorMessage = 'An email is required';
        }
        if(!name) {
            errorMessage = 'A name is required';
        }
        if(!comment) {
            errorMessage = 'A comment is required';
        }

        console.log('errormessage', errorMessage);
    
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
                sendgrid.send({ email, subject, message}),
            ];
            if(signup) {
                tasks.push(mailchimp.subscribe({name, email}));
            }
    
            Promise.all(tasks)
            .then((result) => {
                console.log('result',result);
                res.send('<h2>Thanks for reaching out</h2><p>We\'ll be in touch shortly.</p>');
            })
            .catch((error) => {
                console.log('error',error);
                res.send(error);
            });
        }
    });
})

exports.api = functions.https.onRequest(app);
