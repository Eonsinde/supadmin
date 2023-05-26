const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/user.js");


// @desc      register new user
// @route     POST /api/users/register
// @access    Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

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

    // hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        firstName: firstName ? firstName : "",
        lastName: lastName ? lastName : "",
        username,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            message: "success",
            data: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
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
        // generate token
        generateToken(res, user._id);
        // console.log("user id:", user._id, "\n\n\n");

        res.status(200).json({
            message: "success",
            data: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            }
        });
    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
})

// @desc      Get a user
// @route     GET /api/users/me
// @access    Private
const getUser = expressAsyncHandler(async (req, res) => {
    const { _id, username, email, firstName, lastName } = await User.findById(req.user.id);
    
    res.status(200).json({ 
        id: _id,
        username,
        email,
        firstName,
        lastName
    });
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
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
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
    getUser,
    updateUser
}