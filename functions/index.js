const functions = require("firebase-functions");
const url = require('url');

exports.test = functions.https.onRequest((req, res) => {
    res.send("Test successful!");
});

exports.send_sms = functions.https.onRequest((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.send(parsedUrl.query);
});