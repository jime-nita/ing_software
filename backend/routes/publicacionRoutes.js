const express = require("express")
const router = express.Router()
const { getPublicaciones, createPublicacion, updatePublicacion, deletePublicacion } = require("../controllers/publicacionController")
const { protect } = require("../middleware/authMiddleware")

router.route('/')
    .get(getPublicaciones)
    .post(protect, createPublicacion)

router.route('/:id')
    .put(protect, updatePublicacion)
    .delete(protect, deletePublicacion)

module.exports = router;