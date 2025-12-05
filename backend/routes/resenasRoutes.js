const express = require("express")
const router = express.Router()
const { getResenas, createResena, updateResena, deleteResena, getPromedioPorProfesor } = require("../controllers/resenaControllers") 
const { protect } = require("../middleware/authMiddleware")

router.route('/')
    .get(protect, getResenas) 
    .post(protect, createResena) 

router.route('/:id')
    .put(protect, updateResena)
    .delete(protect, deleteResena)

router.get('/promedio', getPromedioPorProfesor) 

module.exports = router;