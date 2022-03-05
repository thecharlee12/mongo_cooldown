# mongo-cooldown

[![npm (scoped)](https://img.shields.io/npm/v/mongo-cooldown.svg)](https://www.npmjs.com/package/mongo-cooldown)

Set cooldowns for discord commands with mongoose

## Install

```
npm install mongo-cooldown
```

## Usage

```js
const cooldowns = require("mongo-cooldown");

// add a cooldown
let cooldown = await cooldowns.addCoolDown("398314054147637248", 60000 * 60 * 24, "daily")
//=> Time cooldown ends

// Check 
let cooldown = await cooldowns.checkCoolDown("398314054147637248", "daily")
// Output: 
{
    ready: false, // if the cooldown is over
    time: milliseconds, // time remaining in milliseconds
    command: "daily", // command name
    unixTime: time // time left in unix timestamp 
}
```

