
const functions = require('firebase-functions');
exports.date = functions.https.onRequest((req, res) => {
  res.send('hello world');
});

