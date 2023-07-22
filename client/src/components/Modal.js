import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
      <div className="bg-white rounded-lg p-4 max-w-md">{children}</div>
      <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
        Close
      </button>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;

