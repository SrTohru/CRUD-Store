import React from 'react';
import { Link } from 'react-router';

export default function searchBard() {
    return (
        <nav className="bg-[#aadead] p-5 mb-2 rounded-lg shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Gestor de Productos</Link>
            </div>
        </nav>
    )
}
