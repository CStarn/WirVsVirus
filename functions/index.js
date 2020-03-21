const functions = require("firebase-functions");
const sms = require("./sms");

exports.sms = functions.https.onRequest(sms.handler);
