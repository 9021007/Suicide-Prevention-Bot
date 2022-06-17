const mongoose = require('mongoose');

const Server = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    Lang: {
        type: String,
        defualt: "en",
    },
    BLW: {
        type: Array,
        defualt: [],
    },
    WLW: {
        type: Array,
        default: [],
    },
    Channel_Mute: {
        type: Array,
        default: [],
    },
    User_Mute: {
        type: Array,
        default: [],
    },
    DM_Mute: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("server_config", Server); 