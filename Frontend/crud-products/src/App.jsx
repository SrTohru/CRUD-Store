import { BrowserRouter, Route, Routes } from 'react-router';
import ProductList from './components/productList.jsx';
import ProductForm from './components/productForm.jsx';
import Header from './components/header.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto p-10">

        <Header />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/nuevo-producto" element={<ProductForm />} />
          <Route path="/editar-producto/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
