import React from 'react';
import { useState } from 'react';
import { createProduct } from '../api/products';
import { useNavigate } from 'react-router';

export default function ProductForm() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...product,
            precio: parseFloat(product.precio),
            cantidad: parseInt(product.cantidad)
        };
        await createProduct(productData);

      
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-amber-200 p-5 rounded-lg shadow-md mt-10 mx-10">
                <h2 className="text-2xl font-bold mb-5 text-sky-900">Formulario de Producto</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
                    <input 
                    type="text" 
                    id="nombre"
                    onChange={(e) => setProduct({...product, nombre: e.target.value})}
                    className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
                    <input 
                    type="text" 
                    id="descripcion"
                    onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                    className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Precio:</label>
                    <input 
                    type="number" 
                    id="precio"
                    onChange={(e) => setProduct({...product, precio: e.target.value})}
                    className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Cantidad:</label>
                    <input 
                    type="number" 
                    id="cantidad"
                    onChange={(e) => setProduct({...product, cantidad: e.target.value})}
                    className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                </div>

                <div className="mt-3 flex justify-center gap-4">
                    <button type="submit" onClick={() => navigate('/')} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Guardar Producto</button>
                     <button onClick={() => navigate('/')} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cancelar</button>
                     </div>
            </form>
        </div>
    )
}
