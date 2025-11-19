import { Cross, X } from 'lucide-react';
import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
    if(!isOpen) return null;
  return (
    <div className='bg-gray-400/60 absolute top-0 left-0 w-full h-full flex justify-center items-start pt-50'>
      <div className="bg-white w-lg h-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2 border-b border-gray-200 p-4">
            <h5 className=''>{title}</h5>
            <X onClick={onClose} className='size-5'/>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  )
}

export default Modal
