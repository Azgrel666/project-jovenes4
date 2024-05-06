import React from 'react';
import { referencias } from "./constants/referencias.js";

const Modal = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-3/4 ">

      <div className='flex justify-between'>

      <h2 className="text-xl font-bold mb-4 text-neutral-800">Referencias</h2>
      <button
          className="right-2 text-gray-500 hover:text-neutral-800"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>


        
      </div>

<div className='inline-block overflow-auto w-full h-5/6'>
<ul className="list-disc pl-4 text-neutral-700 whitespace-pre-line">
          {Object.entries(referencias).map(([key, value]) => (
            <li key={key} className="mb-2">
              {value}
            </li>
          ))}
        </ul>

</div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;

