import React, { useState } from "react";
import { useQuery } from "react-query";
import { IBook } from "../../interfaces/bookInterface";
import BookList from "../../components/BookList";
import BookPage from "../../components/BookPage";
import { fetchLikeList } from "../../api";

function FavorBookMain() {
  const [page, setPage] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const { data } = useQuery<IBook>(["likeList", page], fetchLikeList, {
    keepPreviousData: true, // 페이지 변경 시 이전 데이터 유지 하기 위함
  });

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col p-4">
      <div className="mt-12 mb-4">
        <span className="text-xl font-bold text-white">관심 작품</span>
      </div>
      <BookList books={data} isFavor={true} />
      <BookPage
        currentPage={page}
        totalPages={data?.totalPages || -1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FavorBookMain;
