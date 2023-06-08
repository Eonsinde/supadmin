const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.js");


// @desc      register new user
// @route     POST /api/users/register
// @access    Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;

    if (!email || !username || !password) {
        res.status(400);
        throw new Error("Please fill in all the required fields");
    }
    
    // check to see if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // create user
    const user = await User.create({
        fullName: fullName ? fullName : "",
        username,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            message: "success",
            data: {
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }) ;
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
})

// @desc      Authenticate a user
// @route     POST /api/users/login
// @access    Public
const loginUser = expressAsyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    // check email
    const user = await User.findOne({ email: identifier });

    if (!user) {
        res.status(401);
        throw new Error("Account not found");
    }

    if (user && (await user.matchPassword(password))) {
        // generate token and set-cookie in res headers
        generateToken(res, user._id);

        res.status(200).json({
            message: "success",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
})

// @desc      Get a auth user
// @route     GET /api/users/me
// @access    Private
const getMe = expressAsyncHandler(async (req, res) => {
    const { 
        _id, 
        username, 
        email, 
        fullName, 
        phoneNumber, 
        city, 
        state, 
        country, 
        occupation, 
        transactions, 
        role 
    } = await User.findById(req.user._id);
    
    res.status(200).json({ 
        _id,
        username,
        email,
        fullName,
        phoneNumber: phoneNumber || "", 
        city: city || "", 
        state: state || "", 
        country: country || "", 
        occupation: occupation || "",  
        transactions, 
        role 
    });
})

// @desc      Get a user
// @route     GET /api/users/:id
// @access    Public
const getUser = expressAsyncHandler(async (req, res) => {
    try {
        const { 
            _id, 
            username, 
            email, 
            fullName, 
            phoneNumber, 
            city, 
            state, 
            country, 
            occupation, 
            transactions, 
            role 
        } = await User.findById(req.params.id);
        
        res.status(200).json({ 
            _id,
            username,
            email,
            fullName,
            phoneNumber: phoneNumber || "", 
            city: city || "", 
            state: state || "", 
            country: country || "", 
            occupation: occupation || "",  
            transactions, 
            role 
        });
    } catch (err) {
        console.error("Error::getUser::", err.message);
        res.status(404).json({
            message: err.message
        });
    }
})

// @desc      Update a user
// @route     PUT /api/users/me
// @access    Private
const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        console.log(req.body);
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.fullName = req.body.fullName || user.fullName;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.city = req.body.city || user.city;
        user.state = req.body.state || user.state;
        user.country = req.body.country || user.country;
        user.occupation = req.body.occupation || user.occupation;
        user.role = req.body.role || user.role;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            phoneNumber: updatedUser.phoneNumber, 
            city: updatedUser.city, 
            state: updatedUser.state, 
            country: updatedUser.country, 
            occupation: updatedUser.occupation, 
            transactions: updatedUser.transactions,  
            role: updatedUser.role 
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

// @desc      Logout user
// @route     POST /api/users/logout
// @access    Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "success" });
})

// generate JWT
const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        maxAge: 30 * 60 * 60 * 24 * 1000
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    getUser,
    updateUser
}