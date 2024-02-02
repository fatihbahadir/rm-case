import React from 'react';
import Modal from 'react-modal';

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirmDelete }) => {
  const handleConfirmDelete = () => {
    onConfirmDelete();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete Modal"
      className='z-[999] fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md w-[80%] h-[35%] sm:h-[23%]'
      overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-[998]'
    >
      <h2 className='text-2xl font-bold mb-4'>Confirm Delete</h2>
      <p className='text-gray-700 mb-6'>Are you sure you want to remove this character from favorites?</p>
      <div className='flex justify-end space-x-4'>
        <button
          onClick={handleConfirmDelete}
          className='px-4 py-2 bg-green text-white rounded-md hover:bg-[rgb(100,176,200)]'
        >
          Yes
        </button>
        <button
          onClick={onRequestClose}
          className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
