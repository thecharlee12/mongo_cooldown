const Commands = require("./models/command.js");
const moment = require("moment");
module.exports = {
    addCoolDown: async function(userID, time, command) {
        if(typeof userID !== "string") throw new TypeError("Invalid user ID was provided. Needs to be a string");
        if(typeof command !== "string") throw new TypeError("Invalid command was provided. Needs to be a string.");
        if(typeof time !== "number") throw new TypeError("Invalid time was provided. Needs to be a number in milliseconds.");

        if(isNaN(time)) return console.error("Time supplied is not a number");

        let newCd = moment(new Date()).add(time, "milliseconds").format('DD/MM/YYYY HH:mm:ss')

        var existing = await Commands.findOne({userID: userID, command: command});

        if(!existing){ 
            await Commands.create({
                command: command,
                cooldown: newCd,
                userID: userID
            })
        } else {
            existing.cooldown = newCd;
            await existing.save()
        }
        
        return moment(newCd, "DD/MM/YYYY HH:mm:ss").valueOf();
    },

    checkCoolDown: async function(userID, command) {
        if(typeof userID !== "string") throw new TypeError("Invalid user ID was provided. Needs to be a string");
        if(typeof command !== "string") throw new TypeError("Invalid command was provided. Needs to be a string.");
        var existing = await Commands.findOne({userID: userID, command: command});

        if(!existing) {
            let object = {
                ready: true,
                time: null,
                command: command
            }
            return object;
        }

        var milliseconds = moment.duration(moment(existing.cooldown, "DD/MM/YYYY HH:mm:ss").diff(moment(new Date(), "DD/MM/YYYY HH:mm:ss"))).asMilliseconds();

        if(milliseconds > 0) {
            let object = {
                ready: false,
                time: milliseconds,
                command: command,
                unixTime: moment(existing.cooldown, "DD/MM/YYYY HH:mm:ss").unix()
            }
            return object;
        } 
        let object = {
            ready: true,
            time: null,
            command: command,
            unixTime: moment(existing.cooldown, "DD/MM/YYYY HH:mm:ss").unix()
        }
        return object;
    }
}
