import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../api/products";

export default function ProductList() {

    const [products, setProducts] = useState([]);

    const loadedProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    useEffect(() => {
        loadedProducts();
    }, []);

  return (
    <div className="mt-10">
        
      <h1 className="text-3x1 font-bold text-sky-900">Productos en disponibilidad</h1>
    
      <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4"> 
        { products.map( product => (
          <div key={product.id} className="bg-amber-200 p-4 rounded-lg shadow">
            <p>{product.nombre}</p>
            <p>{product.descripcion}</p>
            <p>{product.precio}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
