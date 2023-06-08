const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, "Please add a name"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) { 
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;