const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    serverID: String,
    mode: String,
})

module.exports = mongoose.model('Server', ServerSchema);