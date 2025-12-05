const express = require("express")
const router = express.Router()
const { getProductos, createProducto, updateProducto, deleteProducto } = require("../controllers/productoController")
const { protect } = require("../middleware/authMiddleware")

router.route('/')
    .get(protect, getProductos) 
    .post(protect, createProducto)

router.route('/:id')
    .put(protect, updateProducto)
    .delete(protect, deleteProducto)

module.exports = router;