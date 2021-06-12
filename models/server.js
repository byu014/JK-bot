const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    serverID: String,
    mode: String,
    volume: Number,
})

module.exports = mongoose.model('Server', ServerSchema);