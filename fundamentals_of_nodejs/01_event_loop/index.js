const fs = require("node:fs")
console.log("Start")

fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
})

console.log("End")
