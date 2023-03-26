const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    uses: { type: Number, default: 0 },
    lastUse: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Url", urlSchema);