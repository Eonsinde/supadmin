const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    userId: String,
    cost: Number,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number
    },
}, {
    timestamps: true,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;