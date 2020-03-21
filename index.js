const functions = require("firebase-function");

exports.test = functions.https.onRequest((req, res) => {
    res.send("Test successful!");
});