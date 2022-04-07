const config = {
    "api": {
        "address": process.env.API_ADDRESS,
        "port": process.env.API_PORT
    },

    "bot":{
        "token": process.env.BOT_TOKEN 
    },

    "garden": {
        "suricato": process.env.SURICATO_GARDEN
    }
}

module.exports = config

// {
//     "api": {
//         "address": "api",
//         "port": 3000
//     },

//     "bot": {
//         "TOKEN": "5065547103:AAGZ_ILuJ9ksTFGiGxUEa2fAdFtI9fUa-XE"
//     }
// }