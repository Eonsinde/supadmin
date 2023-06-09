const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");


// cookies
const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token){
        try {
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not Authorized");
        }
    } else {
        res.status(401);
        throw new Error("No Authorization Token Provided");
    }
});

module.exports = {
    protect
}