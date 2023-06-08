const mongoose = require("mongoose");
// const User = require("../models/user.js");
// const { hashUsersPassword } = require("../utils");
// const Product = require("../models/product");
// const ProductStat = require("../models/productStat");
// const { dataProduct, dataProductStat  } = require("../data/index");


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // const hashedUsers = await hashUsersPassword(defaultUsers);
        // User.insertMany(hashedUsers);
        // Product.insertMany(dataProduct); 
        // ProductStat.insertMany(dataProductStat);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;