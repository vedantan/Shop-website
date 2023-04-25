const express = require("express");
const route = express.Router();
const { additems, seeAllItems, deleteitem, updateitem, find } = require("../Controller/operationController")
const validateToken = require("../middleware/validateTokenHandler");


route.use(validateToken)
route.post("/add", additems)
route.get(("/getall"), seeAllItems)
route.delete("/:id", deleteitem)
route.put("/:id", updateitem)
route.get("/:id", find)


module.exports = route;