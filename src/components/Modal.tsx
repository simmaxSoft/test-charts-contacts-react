import React, { useState } from 'react';
import Cross from './Cross';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
  mode: 'edit' | 'create'
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, mode, children }) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  };

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '4px',
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle} className='relative'>
        <Cross onClick={onClose}/>
        {children}
      </div>
    </div>
  );
};

export default Modal;