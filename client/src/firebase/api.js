import axios from "axios";

const FIREBASE_CLOUD_FUNCTION_URL = "https://us-central1-wirvsvirus-19373.cloudfunctions.net/sms";

const TEST_URL = "https://postb.in/1584876792666-3796936711296";

const BASE_URL = process.env.NODE_ENV !== "production" ? TEST_URL : FIREBASE_CLOUD_FUNCTION_URL;

export const sendComeInSMS = (number, name) => axios.post(BASE_URL + "/notify", null, {params: {to: number, name}});

