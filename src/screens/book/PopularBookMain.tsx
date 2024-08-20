import { useAppSelector } from "../../redux/hooks";
import "../../css/scroll.css";
import BookList from "../../components/BookList";
import { useQuery } from "react-query";
import { IBook } from "../../interfaces/bookInterface";
import { useState } from "react";
import { fetchBookData } from "../../api";
import BookPage from "../../components/BookPage";

function PopularBookMain() {
  const popularBooks = useAppSelector((state) => state.books.popular);
  const [page, setPage] = useState(0);

  const { data } = useQuery<IBook>(
    ["popular", page],
    () => fetchBookData("popular", page),
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
        <span className="text-xl font-bold text-white">인기있는 작품</span>
      </div>
      <BookList books={data} />
      <BookPage
        currentPage={page}
        totalPages={popularBooks.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PopularBookMain;
