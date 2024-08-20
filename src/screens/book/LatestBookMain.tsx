import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import BookList from "../../components/BookList";
import { useQuery } from "react-query";
import { IBook } from "../../interfaces/bookInterface";
import { fetchBookData } from "../../api";
import BookPage from "../../components/BookPage";

function LatestBookMain() {
  const latestBooks = useAppSelector((state) => state.books.latest);
  const [page, setPage] = useState(0);

  const { data } = useQuery<IBook>(
    ["latest", page],
    () => fetchBookData("latest", page),
    {
      keepPreviousData: true, // 페이지 변경 시 이전 데이터 유지 하기 위함
    }
  );
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">최근에 추가된 작품</span>
      </div>
      <BookList books={data} />
      <BookPage
        currentPage={page}
        totalPages={latestBooks.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default LatestBookMain;
