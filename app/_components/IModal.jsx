import React from 'react';

const IModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-lg max-w-[66.67%] max-h-[66.67%] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default IModal;