const moment = require("moment");
const express = require("express");
const app = express();

/**
 * Parses the SMS API call.
 * A call at the URL /sms/postpone/ sends an "appointment postponed" message, and expects the parameters
 *      - 'to' with the recipient phone number
 *        (formatted according to E.164: [+][country code][phone number including area code])
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

    //todo do input validation here

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
    //const relative = moment(+time).fromNow(); (unresolved method?)

    //build sms message
    const message = `${name}, Ihr Termin wurde verschoben. Neue Uhrzeit: ${clock}`;

    //return json message contents for validation at this point
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

exports.handler = app;