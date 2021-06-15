const User = require('../models/user');

//creates db entry for server if it does not already exist
module.exports.userCheck = async function(discordID){
    let user = await User.findOne({discordID})
    if(user === null){
        user = new User({discordID: discordID, token: null, username: null});
        console.log('user created', user);
    }
    await user.save();
    return user;
}