
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                {children}
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;