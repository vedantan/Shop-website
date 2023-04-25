const { Console } = require("console");
const express = require("express");
const dbconnect = require("./config/dconnection")
const routeauth = require("./Routes/auth")
const routeoperation = require("./Routes/operations")

require("dotenv").config();
const port = process.env.PORT
const app = express();


async function main() {
    await dbconnect();
    app.use(express.json())

    // app.get("/", (req, resp) => {
    //     console.log("i am here")
    // })

    app.use("/", routeauth)
    app.use("/", routeoperation)
    app.use("/:id", routeoperation)

    app.listen(port, () => {
        console.log("server is live")
    })
}


main()





