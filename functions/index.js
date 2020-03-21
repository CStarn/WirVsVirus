const functions = require("firebase-functions");
const url = require('url');
const from = '+49XXXXXXXXXXX'; //todo insert from telephone number here

exports.test = functions.https.onRequest((req, res) => {
    res.send("Test successful!");
});

/**
 * Parses the SMS API call.
 * A call at the URL /sms/postpone/ sends an "appointment postponed" message, and expects the parameters
 *      - 'to' with the recipient phone number
 *        (formatted according to E.164: [+][country code][phone number including area code])
 *      - 'time' with the new instant of the appointment in unix time.
 * Similarly, a call at /sms/notify/ sends an appointment notification message, and expects only the parameters
 *      - 'to' with the recipient phone number (see above).
 *
 * @type {HttpsFunction}
 */
exports.sms = functions.https.onRequest((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    //we accept postpone and notify as calls
    if (parsedUrl.path === "/postpone") {

    } else if (parsedUrl.path === "/notify") {

    }

    //extract from, to phone number and message content
    res.send(parsedUrl.query);
});