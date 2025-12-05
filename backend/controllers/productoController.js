const asyncHandler = require('express-async-handler');
const Producto = require('../models/productoModel'); 

const getProductos = asyncHandler( async (req, res) => {
    const productos = await Producto.find(); 
    res.status(200).json(productos);
});

const createProducto = asyncHandler( async (req, res) => {
    const { nombre, descripcion, precio, contacto } = req.body;

    if(!nombre || !descripcion || !precio || !contacto) {
        res.status(400);
        throw new Error('Por favor, completa todos los campos del producto.');
    }

    const producto = await Producto.create({
        ...req.body,
        user: req.user.id
    });
    
    res.status(201).json(producto); 
});

const updateProducto = asyncHandler( async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto){
        res.status(404)
        throw new Error('Producto no existe')
    }

    if (producto.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        const productoUpdated = await Producto.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        res.status(200).json(productoUpdated)
    }
})

const deleteProducto = asyncHandler( async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto){
        res.status(404)
        throw new Error('Producto no existe')
    }

    if (producto.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        await producto.deleteOne();
        res.status(200).json({id: req.params.id, mensaje: 'Producto eliminado correctamente'} )
    }
})


module.exports = { 
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto
};