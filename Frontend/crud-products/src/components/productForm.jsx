import React from 'react';
import { useState } from 'react';
import { createProduct } from '../api/products';
import  Modal  from './modal';
import { useNavigate, Link } from 'react-router-dom';

export default function ProductForm() {

    const navigate = useNavigate();

    const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
    const [modalErrorOpen, setModalErrorOpen] = useState(false);

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!productIsValid()) return;

        const productData = {
            ...product,
            precio: parseFloat(product.precio),
            cantidad: parseInt(product.cantidad)
        };
        
        setModalSuccessOpen(true);
        await createProduct(productData);
        resetForm();
    }

      function resetForm() {
        setProduct({
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad: 0
        });
    }

    function productIsValid() {
           if(!product.nombre || !product.descripcion || !product.precio || !product.cantidad) {
            setModalErrorOpen(true);
             return false;
        }
            return true;
        }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="bg-amber-200 p-5 rounded-lg shadow-md mt-10 mx-10">
                    <h2 className="text-2xl font-bold mb-5 text-sky-900">Formulario de Producto</h2>
                     <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
                        <input 
                        type="text" 
                        id="nombre"
                        value={product.nombre} 
                        onChange={(e) => setProduct({...product, nombre: e.target.value})}
                        className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
                        <input 
                        type="text" 
                        id="descripcion"
                        value={product.descripcion} 
                        onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                        className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Precio:</label>
                        <input 
                        type="number" 
                        id="precio"
                        value={product.precio} 
                        onChange={(e) => setProduct({...product, precio: e.target.value})}
                        className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Cantidad:</label>
                        <input 
                        type="number" 
                        id="cantidad"
                        value={product.cantidad} 
                        onChange={(e) => setProduct({...product, cantidad: e.target.value})}
                        className="w-full p-2 bg-white border border-black-300 rounded-lg" />
                    </div>

                    <div className="mt-3 flex justify-center gap-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Guardar Producto</button>
                        <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cancelar</Link>
                    </div>
                </form>
            </div>

            <Modal isOpen={modalSuccessOpen} onClose={() => setModalSuccessOpen(false)}>
                <div className="p-4">
                    <h3 className="text-lg font-bold">Producto creado</h3>
                    <p className="mt-2">El producto se ha creado correctamente.</p>
                    <div className="mt-4">
                        <button
                            onClick={() => { setModalSuccessOpen(false); navigate('/'); }}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Ir al inicio
                        </button>
                    </div>
                </div>
            </Modal>

               <Modal isOpen={modalErrorOpen} onClose={() => setModalErrorOpen(false)}>
                <div className="p-4">
                    <h3 className="text-lg font-bold">Error al crear producto</h3>
                    <p className="mt-2">La información proporcionada no es válida. Por favor, inténtalo de nuevo.</p>
                </div>
            </Modal>
        </>

    )
}

