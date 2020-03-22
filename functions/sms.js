const functions = require("firebase-functions");
const moment = require("moment");
const express = require("express");
const authid = functions.config().twilio.authid;
const token = functions.config().twilio.token;
const from = "+19095314450";
const twilio = require("twilio");
const client = new twilio(authid, token);
const app = express();

/**
 * Important notice for the recipient ('to') phone numbers:
 * A request for an SMS message to the phone number +49 123 456 7890
 * needs to be formatted in the query string to this cloud function as
 * to=491234567890.
 */

/**
 * Parses the SMS API call.
 * A call at the URL /sms/update/ sends an "appointment updated" message, and expects the parameters
 *      - 'to' with the recipient phone number
 *        (formatted according to E.164: [+][country code][phone number including area code])
 *        <--> without! the +
 *      - 'name' with the name of the patient
 *      - 'time' with the new instant of the appointment in unix time in milliseconds.
 */
app.post("/update", (req, res) => {
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
    res.send(updateSMSUnchecked(to, name, time));
});

/**
 * Creates and sends the update SMS message without input validation.
 * @param to cell phone number of recipient
 * @param name name of recipient
 * @param time unix timestamp in milliseconds of new appointment
 * @returns {{name: *, to: *, time: *, message: string}}
 */
function updateSMSUnchecked(to, name, time) {
    //create moment from unix timestamp and extract clock string and relative time
    const parsedTime = moment(+time);
    const clock = parsedTime.format("HH:mm");
    const relative = moment(+time).fromNow();

    //build sms message
    const message = `${name}, your appointment time was updated. The new time is: ${clock} (${relative})`;

    //call api
    twilioAPICall(message, to);

    //return json message contents for validation of the data sent to the api at this point
    return {
        "to": to,
        "name": name,
        "time": time,
        "message": message,
        "executedAt": + new Date()
    };
}

/**
 * Similarly, a call at /sms/notify/ sends an appointment notification message, and expects the parameters
 *      - 'to' with the recipient phone number (see above)
 *      - 'name' with the recipient name.
 */
app.post("/notify", (req, res) => {
    //we accept postpone and notify as calls
    let to = req.query.to;
    let name = req.query.name;

    //handle missing params and return 400
    if (to === undefined || name === undefined) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write("Bad request: Expected parameters to and name.");
        res.end();
        return;
    }

    //input validation (for later)

    //send response for debugging at this point
    res.send(notifySMSUnchecked(to, name));
});

/**
 * Creates and sends a notification SMS without input validation.
 * @param to the recipient phone number
 * @param name the name of the recipient
 */
function notifySMSUnchecked(to, name) {
    //build sms message
    const message = `${name}, your appointment starts now. Please find your way to the practitioner's office.`;

    //call api
    twilioAPICall(message, to);

    //return json message contents for validation of the data sent to the api at this point
    return {
        "to": to,
        "name": name,
        "message": message,
        "executedAt": new Date().toString()
    };
}

/**
 * Executes the actual SMS twilio API call.
 * @param message the message to send
 * @param to clean phone number to send it to in the format 491234567890.
 *        This function will concatenate the '+' to the front of the phone
 *        number, as it is required internally by the Twilio API.
 */
function twilioAPICall(message, to) {
    //convert 'to' to string and concatenate the + for the phone number
    to = '+' + to;

    console.log("API call with " + message + ", " + to);

    client.messages
        .create({
            body: message,
            from: from,
            to: to
        })
        .then(message => {
            console.log(message.sid);
        })
        .catch(err => {
            throw err;
        });
}

exports.handler = app;
