const sendgrid = require('@sendgrid/mail');
const functions = require('firebase-functions');

module.exports.send = function({email, subject, message}) {
    const SENDGRID_API_KEY = functions.config().sendgrid.api_key;
    sendgrid.setApiKey(SENDGRID_API_KEY);
    let msg;
    if(email === 'test@pint.com') {
        msg = {
            to: 'test@sink.sendgrid.net',
            from: 'noreply@pint.com',
            replyTo: email,
            subject,
            text: message,
            html: message,
            mailSettings: {
                sandbox_mode: {
                    enable: true,
                }
            }
        };
    } else {
        msg = {
            to: 'sales@pint.com',
            from: 'noreply@pint.com',
            replyTo: email,
            subject,
            text: message,
            html: message,
        };
    }
    return sendgrid.send(msg);
}