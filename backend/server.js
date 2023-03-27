require('dotenv').config();
const express = require('express');
const port = 3500;
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const verifyReCaptcha = require('./middleware/verifyReCaptcha')

//prevent users from shortening short links (on addNewUrl check if long link domain !== short link domain)

const app = express();

const corsConfig = {
    credentials: true,
    origin: 'https://url-shrtnr-app.netlify.app',
    optionSuccessStatus: 200
};
app.use(cors(corsConfig));

app.use(bodyParser.json());

mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URI);
}

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['https://url-shrtnr-app.netlify.app']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => res.send('URL Shortener API'))
app.use("/", verifyReCaptcha, require("./routes/urlRoutes"));

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
