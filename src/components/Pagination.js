// Pagination.js

import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const renderPageNumbers = () => {
    const displayRange = 3; // Gösterilecek sayfa numaralarının aralığı

    let startPage = Math.max(1, currentPage - displayRange);
    let endPage = Math.min(totalPages, currentPage + displayRange);

    if (currentPage <= displayRange) {
      endPage = Math.min(displayRange * 2 + 1, totalPages);
    } else if (currentPage >= totalPages - displayRange) {
      startPage = Math.max(totalPages - displayRange * 2, 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return pageNumbers.map((number) => (
      <li key={number}>
        <button
          onClick={() => setPage(number)}
          className={`flex items-center justify-center px-3 h-12 leading-tight text-black bg-white border border-gray-300 ${
            number === currentPage
              ? 'text-white border-gray-300 !bg-green hover:bg-green hover:text-white'
              : 'border-gray-300 hover:bg-green hover:text-white'
          }`}
        >
          {number}
        </button>
      </li>
    ));
  };

  return (
    <nav className='w-full flex items-center justify-center mt-12'>
      <ul className='inline-flex -space-x-px text-sm'>
        <li>
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center justify-center px-3 h-12 ms-0 leading-tight text-black bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-green hover:text-white'
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex items-center justify-center px-3 h-12 leading-tight text-black bg-white border border-gray-300 rounded-e-lg hover:bg-green hover:text-white'
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
