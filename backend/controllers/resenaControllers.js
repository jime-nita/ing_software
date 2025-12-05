const asyncHandler = require('express-async-handler');
const Resena = require('../models/resenaModel'); 

const getResenas = asyncHandler( async (req, res) => {
    // en ULIFE, el usuario necesita consultar calificaciones brindadas por otros estudiantes
    // para hacerlo más facil, esta función podría obtener TODAS las reseñas
    // para ver solo las propias puede usar: const resenas = await Resena.find({user: req.user.id});
    const resenas = await Resena.find(); 
    res.status(200).json(resenas);
})

const createResena = asyncHandler( async (req, res) => {
    if(!req.body.comentario || !req.body.profesor_o_materia || !req.body.calificacion) {
        res.status(400)
        throw new Error('Por favor, completa los campos requeridos: comentario, profesor/materia y calificación.');
    }

    const resena = await Resena.create({
        comentario: req.body.comentario,
        profesor_o_materia: req.body.profesor_o_materia,
        calificacion: req.body.calificacion,
        user: req.user.id
    })
    
    // se manda un mensaje para avisar que la reseña se creó correctamente
    res.status(201).json(resena) 
})

const updateResena = asyncHandler( async (req, res) => {
    const resena = await Resena.findById(req.params.id)

    if (!resena){
        res.status(404)
        throw new Error('Reseña no existe, hermosa')
    }

    // checa si es usuario que actualiza la reseña es el mismo que la creo
    if (resena.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado para actualizar esta reseña :(')
    } else {
        const resenaUpdated = await Resena.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        res.status(200).json(resenaUpdated)
    }
})

const deleteResena = asyncHandler( async (req, res) => {
    // reviso si la reseña existe
    const resena = await Resena.findById(req.params.id)

    if (!resena){
        res.status(404)
        throw new Error('Reseña no existe, hermosa')
    }

    if (resena.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado para eliminar esta reseña :(')
    } else {
        await resena.deleteOne();
        res.status(200).json({id: req.params.id, mensaje: 'Reseña eliminada correctamente'} )
    }
})

// promedio de calificaciones por profesor o materia
const getPromedioPorProfesor = asyncHandler(async (req, res) => {
    const promedio = await Resena.aggregate([
        { 
            $group: {
                _id: '$profesor_o_materia', 
                promedio: { $avg: '$calificacion' }, 
                totalResenas: { $sum: 1 }
            }
        },
        { $sort: { promedio: -1 } } 
    ]);

    res.status(200).json(promedio);
});


module.exports = { 
    getResenas,
    createResena,
    updateResena,
    deleteResena,
    getPromedioPorProfesor
};