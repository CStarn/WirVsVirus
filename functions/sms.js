const from = '+49XXXXXXXXXXX'; //todo insert from telephone number here

const express = require("express");
const app = express();

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
app.get("/", (req, res) => {
    //we accept postpone and notify as calls
    if (req.path === "/postpone") {

    } else if (req.path === "/notify") {

    }
    //extract from, to phone number and message content
    res.send(req.query);
});

exports.sms = app;