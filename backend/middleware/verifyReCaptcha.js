require("dotenv").config()
const fetch = require('node-fetch');

const verifyReCaptcha = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY
    const VERIFY_Url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['gRecaptchaToken']}`;
    fetch(VERIFY_Url, { method: 'POST' })
        .then(data => data.json())
        .then(data => {
            if (data.score <= 0.1) {
                res.status(401).json({ message: "Suspicious behavior detected. Please try again later or contact the support link" })
                return
            } else {
                next()
            }
        });
}
module.exports = verifyReCaptcha