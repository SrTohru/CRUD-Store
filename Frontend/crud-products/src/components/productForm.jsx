import React from 'react';
import { useState, useEffect } from 'react';
// Importamos useParams para obtener el ID de la URL
import { useNavigate, Link, useParams } from 'react-router-dom'; 
// Asume que tienes una función para obtener, crear y actualizar productos
import { createProduct, getProductById, updateProduct } from '../api/products'; 
import Modal from './modal';

export default function ProductForm() {

    // Extraemos el parámetro 'id' de la URL. Si estamos en /nuevo-producto, 'id' será undefined.
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // El modo se define automáticamente: si existe 'id', estamos en 'edit'.
    const isEditMode = !!id; 

    const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
    const [modalErrorOpen, setModalErrorOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Estado de carga para la edición

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0
    })

    // 1. EFECTO PARA CARGAR DATOS SI ESTAMOS EN MODO EDICIÓN
    useEffect(() => {
        // Solo ejecuta esta lógica si hay un ID en la URL
        if (isEditMode) {
            const loadProduct = async () => {
                setLoading(true);
                try {
                    const response = await getProductById(id);
                    // Llenar el estado del formulario con los datos del producto
                    setProduct({
                        nombre: response.nombre,
                        descripcion: response.descripcion,
                        precio: response.precio,
                        cantidad: response.cantidad,
                    });
                } catch (error) {
                    console.error("Error al cargar el producto para edición:", error);
                    // Opcional: Navegar a 404 o mostrar error
                } finally {
                    setLoading(false);
                }
            };
            loadProduct();
        }
    }, [id, isEditMode]); // Dependencia del ID para recargar si cambia el producto a editar

    // 2. LÓGICA DE ENVÍO (Maneja Creación y Actualización)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!productIsValid()) return;

        const productData = {
            ...product,
            // Asegúrate de enviar los números correctamente formateados a la API
            precio: parseFloat(product.precio), 
            cantidad: parseInt(product.cantidad)
        };
        
        try {
            if (isEditMode) {
                // Modo EDICIÓN: Usar la función de actualizar (PUT/PATCH)
                await updateProduct(id, productData);
            } else {
                // Modo CREACIÓN: Usar la función de crear (POST)
                await createProduct(productData);
            }

            setModalSuccessOpen(true);
            resetForm();

        } catch (error) {
            console.error("Error en el envío del formulario:", error);
            setModalErrorOpen(true);
        }
    }

    // Funciones auxiliares
    function resetForm() {
        setProduct({
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad: 0
        });
    }

    function productIsValid() {
        // Validación básica (mejorar con manejo de tipos)
        if(!product.nombre || !product.descripcion || product.precio <= 0 || product.cantidad < 0) {
            setModalErrorOpen(true);
            return false;
        }
        return true;
    }
    
    // Muestra un estado de carga mientras se obtienen los datos a editar
    if (isEditMode && loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold text-[#1a3c1a]">Cargando datos del producto...</p>
            </div>
        );
    }
    

    return (
        <>
            <div className="min-h-screen bg-[#6d916e] py-10 px-4 flex justify-center items-start rounded-lg shadow-lg">
                
                <form onSubmit={handleSubmit} className="bg-[#eedead] border border-[#ccdead] p-8 rounded-xl shadow-lg w-full max-w-lg">
                    
                    <h2 className="text-2xl font-bold mb-6 text-[#1a3c1a] border-b border-[#ccdead] pb-2">
                        {/* Título dinámico: Cambia según si estamos creando o editando */}
                        {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
                    </h2>
                    
                    {/* Input: Nombre */}
                    <div className="mb-5">
                        <label className="block text-[#1a3c1a] font-semibold mb-2">Nombre:</label>
                        <input 
                            type="text" 
                            id="nombre"
                            value={product.nombre} 
                            onChange={(e) => setProduct({...product, nombre: e.target.value})}
                            className="w-full p-3 bg-white border border-[#ccdead] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aadead] transition-all" 
                            placeholder="Ej. Laptop HP"
                        />
                    </div>

                    {/* Input: Descripción */}
                    <div className="mb-5">
                        <label className="block text-[#1a3c1a] font-semibold mb-2">Descripción:</label>
                        <input 
                            type="text" 
                            id="descripcion"
                            value={product.descripcion} 
                            onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                            className="w-full p-3 bg-white border border-[#ccdead] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aadead] transition-all"
                            placeholder="Breve descripción del producto"
                        />
                    </div>

                    {/* Fila para Precio y Cantidad */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-[#1a3c1a] font-semibold mb-2">Precio:</label>
                            <input 
                                type="number" 
                                id="precio"
                                value={product.precio} 
                                onChange={(e) => setProduct({...product, precio: e.target.value})}
                                className="w-full p-3 bg-white border border-[#ccdead] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aadead] transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-[#1a3c1a] font-semibold mb-2">Cantidad:</label>
                            <input 
                                type="number" 
                                id="cantidad"
                                value={product.cantidad} 
                                onChange={(e) => setProduct({...product, cantidad: e.target.value})}
                                className="w-full p-3 bg-white border border-[#ccdead] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aadead] transition-all" 
                            />
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="mt-8 flex justify-end gap-4">
                        <Link to="/" className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-medium transition-colors">
                            Cancelar
                        </Link>
                        <button type="submit" className="bg-[#234e23] text-[#eedead] px-6 py-2 rounded-lg hover:bg-[#1a3c1a] font-medium shadow-sm transition-colors">
                            {/* Texto del botón dinámico */}
                            {isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}
                        </button>
                    </div>
                </form>
            </div>

            {/* MODAL DE ÉXITO */}
            <Modal isOpen={modalSuccessOpen} onClose={() => setModalSuccessOpen(false)}>
                <div className="p-6 bg-[#eedead] rounded-lg">
                    <h3 className="text-xl font-bold text-[#1a3c1a]">
                        {isEditMode ? 'Producto actualizado' : 'Producto creado'}
                    </h3>
                    <p className="mt-3 text-gray-700">El producto se ha {isEditMode ? 'actualizado' : 'creado'} correctamente en la base de datos.</p>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => { setModalSuccessOpen(false); navigate('/'); }}
                            className="bg-[#234e23] text-[#eedead] px-5 py-2 rounded-lg hover:bg-[#1a3c1a]"
                        >
                            Ir al inicio
                        </button>
                    </div>
                </div>
            </Modal>

            {/* MODAL DE ERROR */}
            <Modal isOpen={modalErrorOpen} onClose={() => setModalErrorOpen(false)}>
                <div className="p-6 bg-[#eedead] rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-red-700">Error en la operación</h3>
                    <p className="mt-3 text-gray-700">Por favor, revisa que todos los campos estén completos y sean válidos.</p>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => setModalErrorOpen(false)}
                            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}