const asyncHandler = require('express-async-handler');
const Tarea = require('../models/tareasModel');

const getTareas = asyncHandler( async (req, res) => {
    const tareas = await Tarea.find({user: req.user.id});
    res.status(200).json(tareas);
})

const createTareas = asyncHandler( async (req, res) => {
    if(!req.body.texto) {
        res.status(400)
        throw new Error('Por favor agrega un texto <3');
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json(tarea) 
})

const updateTareas = asyncHandler( async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea){
        res.status(404)
        throw new Error('Tarea no existe, hermosa')
    }

    //verificar que el usuario que actualiza la tarea es el mismo que la creo
    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado para actualizar esta tarea :(')
    } else {
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(tareaUpdated)
    }
})

const deleteTareas = asyncHandler( async (req, res) => {
    // reviso si la tarea existe
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea){
        res.status(404)
        throw new Error('Tarea no existe, hermosa')
    }

    //verificar que el usuario que elimina la tarea es el mismo que la creo
    if (tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado para eliminar esta tarea :(')
    } else {
        await tarea.deleteOne();
        res.status(200).json({id: req.params.id} )
    }
})

module.exports = { 
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas    
};