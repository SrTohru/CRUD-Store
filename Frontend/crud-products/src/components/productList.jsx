import { useState } from "react";
import { useEffect } from "react";
import { deleteProduct } from '../api/products';
import { getProducts } from "../api/products";
import { useNavigate, Link } from 'react-router-dom';

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadedProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  }

  async function deleteProductWithId(id) {
    console.log("Eliminar producto con ID:", id);

    await deleteProduct(id);
    loadedProducts();
  }

  function editProductWithId(id) {
    console.log("Editar producto con ID:", id);

    navigate(`/nuevo-producto/${id}`);
  }


  useEffect(() => {
    loadedProducts();
  }, []);

  return (
    <div className="mt-10">

      <h1 className="text-3xl font-bold text-sky-900">Productos en disponibilidad</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mx-10 gap-5">
        {products.map(product => (
          <div key={product.id} className="bg-amber-200 p-3 rounded-xl shadow">
            <p><span className="font-bold">Nombre:</span> {product.nombre}</p>
            <p><span className="font-bold">Descripción:</span> {product.descripcion}</p>
            <p><span className="font-bold">Precio:</span> {product.precio}</p>
            <p><span className="font-bold">Cantidad:</span> {product.cantidad}</p>

            <div className="mt-3">
              <button onClick={() => editProductWithId(product.id)} className="bg-green-500 px-3 py-1 rounded-lg text-white hover:bg-green-600 mr-2">Editar</button>
              <button onClick={() => deleteProductWithId(product.id)} className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
