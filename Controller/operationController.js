const { send } = require("express/lib/response");
const Item = require("../model/itemsModel")


// to see all the items that we have added
const seeAllItems = async (req, resp) => {
    const getallitems = await Item.find({ user_id: req.user.id });
    resp.send(getallitems)
}



// to add the items to take from shop
const additems = (req, resp) => {
    const { product, price, quantity } = req.body;
    if (!product || !price || !quantity) {
        return resp.send("All the fields are mandotarty")
    }
    const item = new Item({
        product,
        price,
        quantity,
        user_id: req.user.id
    })

    item.save();
    console.log(item)
    resp.send("your product added successfully")
}




const updateitem = async (req, resp) => {
    const item1 = await Item.findById(req.params.id)
    console.log(item1)
    if (!item1) {
        return resp.status(500).send("no Item matches")
    }
    console.log(item1)


    if (item1.user_id.toString() !== req.user.id) {
        resp.status(403)
        return resp.send("User dodn't have permission to update")
    }

    const upd = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    console.log(upd)
    resp.send("Items are updated")

}


// to delete a certain items
const deleteitem = async (req, resp) => {
    const item = await Item.findById(req.params.id)


    if (item.user_id.toString() !== req.user.id) {
        resp.status(403)
        return resp.send("User dodn't have permission to delete")
    }
    const deleteitems = await Item.deleteOne(item);
    console.log(deleteitems)
    resp.send("Items have been deleted")
}

const find = async (req, resp) => {
    const find1 = await Item.findOne({ _id: req.params.id })
    console.log(find1)
    resp.send(find1)
}

module.exports = { seeAllItems, additems, updateitem, deleteitem, find };