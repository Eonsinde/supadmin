const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Product = require("../models/product");
const ProductStat = require("../models/productStat");
const Transaction = require("../models/transaction");
const { containsNumbers } = require("../utils");


// @desc      Get all products
// @route     GET /api/client/products
// @access    Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find();

    const productsWithStats = await Promise.all(products.map(async (product) => {
        const stat = await ProductStat.find({
            productId: product._id
        });

        return {
            ...product._doc,
            stat
        }
    }));

    res.status(200).json({
        products: productsWithStats
    });
})

// @desc      Get all customers
// @route     GET /api/client/customers
// @access    Public
const getCustomers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// @desc      Get all transactions
// @route     GET /api/client/transactions
// @access    Public
const getTransactions = expressAsyncHandler(async (req, res) => {
    try {
        // sort should look like this: { field: "userId", sort: "desc" }
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        const formattedSearch = containsNumbers(search) ? parseFloat(search) : 0.0;
        // console.log("\n\n\nFormatted Search:", search);


        // formatted sort which mongo understand should look like this: { userId: -1 }
        const sortParsed = JSON.parse(sort);

        const generateSort = () => {
            let formattedOrder = null;

            if (sortParsed.sortOrder === 1) {
                formattedOrder = -1;
            } else if (sortParsed.sortOrder === -1) {
                formattedOrder = 0;
            } else if (sortParsed.sortOrder === 0 || sortParsed.sortOrder === 2 || sortParsed.sortOrder === null) {
                formattedOrder = 1;
            } 

            return {
                [sortParsed.sortField]: formattedOrder 
            };
        }

        const sortFormatted = Boolean(sortParsed) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $eq: formattedSearch } },
                { userId: { $regex: new RegExp(search, "i") } },
            ]
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize); 

        // const transactions_ = await Transaction.find({
        //     $or: [
        //         { cost: { $eq: formattedSearch } },
        //         { userId: { $regex: new RegExp(search, "i") } },
        //     ]
        // })
        // console.log("transactions: ", transactions_);

        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $eq: formattedSearch } },
                { userId: { $regex: new RegExp(search, "i") } },
            ]
        });

        res.status(200).json({
            transactions,
            total
        });
    } catch (err) {
        console.log("actual error:", err.message);
        res.status(400).json({ message: err.message });
    }
})

module.exports = {
    getProducts,
    getCustomers,
    getTransactions
}