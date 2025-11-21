
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                {children}
            </div>
        </div>
    );
}

export default Modal;