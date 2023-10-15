const express = require("express");
const { getProducts, getCustomers, getTransactions } = require("../controllers/clientController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", protect, getCustomers);
router.get("/transactions", protect, getTransactions);

module.exports = router;
