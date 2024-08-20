import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

interface ITotalPage {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function BookPage({ currentPage, totalPages, onPageChange }: ITotalPage) {
  const paginationItems = [];
  for (let number = 0; number < totalPages; number++) {
    paginationItems.push(
      <div
        key={number}
        className="bg-[#7C3FFF] mx-1 w-8 h-8 rounded-md hover:opacity-60 flex items-center justify-center"
        onClick={() => onPageChange(number)}
      >
        <Pagination.Item className="flex items-center justify-center ">
          {number + 1}
        </Pagination.Item>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <Pagination className="flex mt-4 text-xl font-bold text-white">
        <Pagination.Prev
          onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />

        {paginationItems}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages - 1 && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages - 1}
        />
      </Pagination>
    </div>
  );
}

export default BookPage;
