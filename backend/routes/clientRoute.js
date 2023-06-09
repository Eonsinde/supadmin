const express = require("express");
const { getProducts, getCustomers } = require("../controllers/clientController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", protect, getCustomers);

module.exports = router;
