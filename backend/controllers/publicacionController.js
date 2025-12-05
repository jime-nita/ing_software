const asyncHandler = require('express-async-handler');
const Publicacion = require('../models/publicacionModel'); 

const getPublicaciones = asyncHandler( async (req, res) => {
    const filtro = {};
    if (req.query.tipo) {
        filtro.tipo = req.query.tipo;
    }
    const publicaciones = await Publicacion.find(filtro); 
    res.status(200).json(publicaciones);
});

const createPublicacion = asyncHandler( async (req, res) => {
    const { titulo, contenido, tipo, fecha_evento } = req.body;

    if(!titulo || !contenido || !tipo) {
        res.status(400);
        throw new Error('Por favor, completa los campos requeridos: título, contenido y tipo.');
    }
    
    if (tipo === 'Evento' && !fecha_evento) {
        res.status(400);
        throw new Error('Si el tipo es Evento, la fecha_evento es obligatoria.');
    }

    const publicacion = await Publicacion.create({
        ...req.body,
        user: req.user.id
    });
    
    res.status(201).json(publicacion); 
});

const updatePublicacion = asyncHandler( async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id)

    if (!publicacion){
        res.status(404)
        throw new Error('Publicación no existe')
    }
    
    if (publicacion.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        const publicacionUpdated = await Publicacion.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        res.status(200).json(publicacionUpdated)
    }
})

const deletePublicacion = asyncHandler( async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id)

    if (!publicacion){
        res.status(404)
        throw new Error('Publicación no existe')
    }

    if (publicacion.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        await publicacion.deleteOne();
        res.status(200).json({id: req.params.id, mensaje: 'Publicación eliminada correctamente'} )
    }
})


module.exports = { 
    getPublicaciones,
    createPublicacion,
    updatePublicacion,
    deletePublicacion
};