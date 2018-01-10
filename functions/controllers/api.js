const express = require('express');
const functions = require('firebase-functions');

module.exports = function() {
    const app = express();
    //  Newsletter form
    app.get('/api/ping', (req, res) => {
        res.send('pong');
    });
    app.post('/api/ping', (req, res) => {
        res.send('ping ping');
    });
    return app;
};
