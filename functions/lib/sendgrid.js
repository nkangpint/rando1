const sendgrid = require('@sendgrid/mail');
const functions = require('firebase-functions');

module.exports.send = function({subject, message}) {
    const SENDGRID_API_KEY = functions.config().sendgrid.api_key;
    sendgrid.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: 'mschultz@zingchart.com',
        from: 'mschultz@pint.com',
        subject,
        text: message,
        html: message,
    };

    return sendgrid.send(msg);
}