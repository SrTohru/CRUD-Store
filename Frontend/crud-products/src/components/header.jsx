import React from 'react';
import { Link } from 'react-router';

export default function Header() {
    return (
        <nav className="bg-amber-100 p-5 mb-2 rounded-lg shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Gestor de Productos</Link>
                <div >
                    <Link to="/nuevo-producto" className="bg-green-500 text-white px-4 py-2 rounded-lg">Nuevo Producto</Link>
                </div>
            </div>
        </nav>
    )
}
