const mongoose = require("mongoose")

const ItemSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: String,
    price: String,
    quantity: String
})

module.exports = mongoose.model("Item", ItemSchema);