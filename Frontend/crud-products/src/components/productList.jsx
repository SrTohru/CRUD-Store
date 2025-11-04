import { getProducts } from "../api/products";

export default function ProductList() {

    const loadedProducts = async () => {
        const response = await getProducts();
        console.log(response);
    }

    loadedProducts();
  return (
    <div>
        
      <h2>Product List</h2>
    
    </div>
  );
}
