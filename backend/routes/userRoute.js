const express =  require("express");
const { registerUser, loginUser, getMe, getUser, updateUser, logoutUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/me")
    .get(protect, getMe)
    .put(protect, updateUser);
router.get("/:id", getUser);


module.exports = router;
