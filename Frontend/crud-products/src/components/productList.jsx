import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from '../api/products';
import { useNavigate } from 'react-router-dom';
import Modal from "./modal";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [modalRemoveConfirm, setModalRemoveConfirm] = useState(false);
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const loadedProducts = async () => {

    try {
          const response = await getProducts();
    setProducts(response);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async function deleteProductWithId(id) {
  try {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
    setModalRemoveConfirm(false);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
  }

  function editProductWithId(id) {
   try {
    navigate(`/nuevo-producto/${id}`);
   } catch (error) {
    console.error("Error al navegar a la página de edición:", error);
   }
  }

  useEffect(() => {
    loadedProducts();
  }, []);

  return (
    <div className="mt-10 bg-[#aadead] p-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-[#1a3c1a] mb-6">Productos en disponibilidad</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-[#eedead] border border-[#ccdead] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            
            <div className="space-y-2 text-gray-700">
              <p><span className="font-bold text-[#1a3c1a]">Nombre:</span> {product.nombre}</p>
              <p><span className="font-bold text-[#1a3c1a]">Descripción:</span> {product.descripcion}</p>
              <p><span className="font-bold text-[#1a3c1a]">Precio:</span> ${product.precio}</p>
              <p><span className="font-bold text-[#1a3c1a]">Cantidad:</span> {product.cantidad}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => editProductWithId(product.id)} 
                className="bg-[#234e23] text-[#eedead] px-4 py-2 rounded-lg hover:bg-[#1a3c1a] transition-colors duration-200 font-medium shadow-sm"
              >
                Editar
              </button>
              
              <button 
                onClick={() => { setModalRemoveConfirm(true); setSelectedProductId(product.id); }} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalRemoveConfirm} onClose={() => setModalRemoveConfirm(false)}>
        <div className="p-6 bg-[#eedead] rounded-lg">
          <h3 className="text-xl font-bold text-[#1a3c1a]">Eliminar producto</h3>
          <p className="mt-3 text-gray-700">¿Estás seguro que quieres eliminar este producto?</p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => { setModalRemoveConfirm(false); deleteProductWithId(selectedProductId); }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm"
            >
              Sí, Eliminar
            </button>
            <button
              onClick={() => setModalRemoveConfirm(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 shadow-sm"
            >
              Cancelar
            </button>

          </div>
        </div>
      </Modal>

    </div>
  );
}