const functions = require("firebase-functions");
//const querystring = require('querystring');

exports.test = functions.https.onRequest((req, res) => {
    res.send("Test successful!");
});

exports.send_sms = functions.https.onRequest((req, res) => {
    res.send(req.path);
});