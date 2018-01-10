const Mailchimp = require('mailchimp-api-v3');
const functions = require('firebase-functions');

module.exports.subscribe = function({
    email,
    name,
}) {

    // Split the name into 2 parts
    name = name.split(' ');
    const firstName = name[0];
    const lastName = (name.length > 1) ? name.slice(1).join(' ') : '';

    const subscriber = {
        email_address: email,
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        },
        status: 'subscribed',
        status_if_new: 'subscribed'
    };

    return new Promise((resolve, reject) => {
        const MAILCHIMP_API_KEY = functions.config().mailchimp.key;
        const MAILCHIMP_CONTACT_LIST_ID = functions.config().mailchimp.contact_list_id;
        const mailer = new Mailchimp(MAILCHIMP_API_KEY);
        mailer.request(({
            method: 'post',
            path: '/lists/{list_id}/members',
            path_params: {
                list_id: MAILCHIMP_CONTACT_LIST_ID
            },
            body: subscriber,
        }))
        .then((response) => {
            const message = '<div style="text-align:center;"><h2>Thanks for signing up</h2><p>We look forward to sharing some truly great content with you. We promise we will not spam your inbox!</p></div>';
            resolve(message)
        })
        .catch((error) => {
            // TODO: Perform a backup in a database if mailchimp failed
            reject('Could not subscribe to the mailing list: ' + error.detail);
        });
    });
}