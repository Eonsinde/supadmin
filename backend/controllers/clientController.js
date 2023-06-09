const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Product = require("../models/product");
const ProductStat = require("../models/productStat");


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



module.exports = {
    getProducts,
    getCustomers
}