const Server = require('../models/server');
const User = require('../models/server');

//creates db entry for server if it does not already exist
module.exports.serverCheck = async function(serverID){
    let server = await Server.findOne({serverID: serverID})
    if(server === null){
        server = new Server({serverID: serverID, mode:'jpop',volume: .2 });
    }
    await server.save();
    return server;
}