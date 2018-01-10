const express = require('express');
const functions = require('firebase-functions');
const sendgrid = require('./lib/sendgrid.js');
const mailchimp = require('./lib/mailchimp.js');
const formidable = require('formidable');
const app = express();

// ENDPOINTS
// const contact = require('./controllers/contact.js');
// const newsletter = require('./controllers/newsletter.js');

// exports.contact = functions.https.onRequest(contact());
// exports.newsletter = functions.https.onRequest(newsletter());

// exports.hello = functions.https.onRequest((req, res) => {
//     console.log('hjere');
//     res.send('ok');
// });

// NEWSLETTER FORM
app.get('/api/ping', (req, res) => {
    res.send('pong');
});
app.post('/api/newsletter', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {

        let errorMessage = null;

        // User input validation
        // TODO: change clientside field_title to field_name
        let { field_email: email, field_title: name } = fields;
    
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


    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    });
    
});


// CONTACT FORM
app.post('/api/contact', (req, res) => {

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
    });
})

exports.api = functions.https.onRequest(app);
