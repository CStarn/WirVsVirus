const from = '+49XXXXXXXXXXX'; //todo insert from telephone number here
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
 * Similarly, a call at /sms/notify/ sends an appointment notification message, and expects only the parameters
 *      - 'to' with the recipient phone number (see above).
 *
 * @type {HttpsFunction}
 */
app.get("/", (req, res) => {
    //we accept postpone and notify as calls
    if (req.path === "/postpone") {
        //expected params to and time
        let to = req.query.to;
        let name = req.query.name;
        let time = req.query.time;

        //handle missing params and return 400
        if (to === undefined || name === undefined || time === undefined) {
            res.writeHead(400, {'Content-Type' : 'text/plain'});
            res.write("Bad request: Expected parameters to, name and time.");
            res.end();
            return;
        }

        //send postpone sms (response only for testing at this point)
        res.send(postponeSMS(to, name, time, res));
    } else if (req.path === "/notify") {

    }

    res.end();
});

/**
 * Creates and sends the postpone SMS message.
 * @param to cell phone number of recipient
 * @param name name of recipient
 * @param time unix timestamp in milliseconds of new appointment
 * @param res response object of query
 * @returns {{name: *, to: *, time: *, message: string}}
 */
function postponeSMS(to, name, time, res) {
    //todo input validation
    return postponeSMSUnchecked(to, name, time, res);
}

/**
 * Creates and sends the postpone SMS message without input validation.
 * @see postponeSMS(to, name, time, res)
 * @returns {{name: *, to: *, time: *, message: string}}
 */
function postponeSMSUnchecked(to, name, time, res) {
    //create moment from unix timestamp and extract clock string and relative time
    const parsedTime = moment(+time);
    const clock = parsedTime.format("HH:mm");
    //const relative = moment(+time).fromNow(); (unresolved method?)

    //build sms message
    const message = `${name}: Ihr Termin wurde verschoben. Neue Uhrzeit: ${clock}`;

    //return json message contents for validation at this point
    return {
        "to" : to,
        "name" : name,
        "time" : time,
        "message" : message
    };
}

exports.handler = app;