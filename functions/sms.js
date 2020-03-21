const functions = require("firebase-functions");
const moment = require("moment");
const express = require("express");
const twilio = require("twilio")(functions.config().twilio.authid, functions.config().twilio.token);
const app = express();

/**
 * Parses the SMS API call.
 * A call at the URL /sms/postpone/ sends an "appointment postponed" message, and expects the parameters
 *      - 'to' with the recipient phone number
 *        (formatted according to E.164: [+][country code][phone number including area code])
 *        <--> without! the +
 *      - 'name' with the name of the patient
 *      - 'time' with the new instant of the appointment in unix time in milliseconds.
 */
app.get("/postpone", (req, res) => {
    //we accept postpone and notify as calls
    let to = req.query.to;
    let name = req.query.name;
    let time = req.query.time;

    //handle missing params and return 400
    if (to === undefined || name === undefined || time === undefined) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write("Bad request: Expected parameters to, name and time.");
        res.end();
        return;
    }

    //input validation (for later)

    //send response for debugging at this point
    res.send(postponeSMSUnchecked(to, name, time));
});


/**
 * Creates and sends the postpone SMS message without input validation.
 * @param to cell phone number of recipient
 * @param name name of recipient
 * @param time unix timestamp in milliseconds of new appointment
 * @returns {{name: *, to: *, time: *, message: string}}
 */
function postponeSMSUnchecked(to, name, time) {
    //create moment from unix timestamp and extract clock string and relative time
    const parsedTime = moment(+time);
    const clock = parsedTime.format("HH:mm");
    const relative = moment(+time).fromNow();

    //convert 'to' to string and concatenate the + for the phone number
    to = '+' + to;

    //build sms message
    const message = `${name}, Ihr Termin wurde verschoben. Neue Uhrzeit: ${clock} (${relative})`;

    //call api
    twilioAPICall(message, to);

    //return json message contents for validation of the data sent to the api at this point
    return {
        "to": to,
        "name": name,
        "time": time,
        "message": message
    };
}

/**
 * Similarly, a call at /sms/notify/ sends an appointment notification message, and expects the parameters
 *      - 'to' with the recipient phone number (see above)
 *      - 'name' with the recipient name.
 */
app.get("/notify", (req, res) => {
    res.send(req.query);
});

/**
 * Executes the actual SMS twilio API call.
 * @param message the message to send
 * @param to the clean phone number to send it to
 */
function twilioAPICall(message, to) {
    twilio.messages
        .create({
            body: message,
            to: to
        })
        .then(message => console.log("Sent: " + message))
}

exports.handler = app;