require("dotenv").config()
const Url = require('../models/Url');
const randomString = require('randomstring');


const addNewUrl = async (req, res) => {
    if (!req.body.urlToShorten) {
        return res.status(400);
    }
    const { urlToShorten } = req.body

    let dbReadyUrl;
    urlFromRequest = ((urlToShorten).split('://'))

    //adds https to links to be stored in database, or if link has defined protocol, it's left without changes
    if (urlFromRequest.length === 1) {
        dbReadyUrl = `https://${urlFromRequest.at(-1)}`
    } else {
        dbReadyUrl = urlToShorten
    }

    const OriginalUrl = await Url.findOne({ longUrl: dbReadyUrl }).exec();
    if (OriginalUrl) {
        return res.json(OriginalUrl);
    }
    const shortenedUrl = randomString.generate(4);


    const UrlObject = { longUrl: dbReadyUrl, shortUrl: shortenedUrl }
    //create and store new url
    const url = await Url.create(UrlObject)
    if (url) {
        res.status(201).json(url)
    } else {
        res.status(400).json({ message: "invalid Url" })
    }
}

const getShortUrl = async (req, res) => {
    const shortenedUrl = req.params.shUrl
    const reqUrl = await Url.findOne({ shortUrl: shortenedUrl }).exec();
    if (!reqUrl) {
        const baseUrl = process.env.BASE_URL
        return res.redirect(baseUrl)
    } else {
        reqUrl.uses++;
        reqUrl.lastUse = Date.now();
        await reqUrl.save();
        res.redirect(reqUrl.longUrl);
    }
}

const getAllUrls = async (req, res) => {
    const allUrls = await Url.find();
    return res.json(allUrls)
}

const DisplayShortUrl = async (req, res) => {
    if (!req.params.shortUrl) return res.status(400).json({ message: "invalid URL" })
    console.log(req.params)
    //gets the last part of shortened link, which is the part stored in DB
    try {
        const shortPath = req.params.shortUrl.split("/")
        const shortUrl = shortPath.at(-1)
        const reqUrl = await Url.findOne({ shortUrl: shortUrl }, '-__v -_id').exec();
        if (!reqUrl) {
            return res.status(400).json({ message: "No matching URL" })
        } else {
            return res.status(201).json(reqUrl)
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }



}

module.exports = {
    addNewUrl,
    getShortUrl,
    getAllUrls,
    DisplayShortUrl
}
