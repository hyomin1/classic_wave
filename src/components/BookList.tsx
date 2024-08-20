import React, { useEffect, useState } from "react";
import { IBook } from "../interfaces/bookInterface";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import axiosApi from "../axios";
import { useQuery } from "react-query";
import { fetchLikeData, fetchLikeList } from "../api";
import { setLikeBooks } from "../redux/slices/likeSlice";
import { FaHeart } from "react-icons/fa";

interface IPopBookProps {
  books: IBook | undefined;
  isFavor?: boolean;
}

function BookList({ books, isFavor }: IPopBookProps) {
  const { data: likeData, refetch } = useQuery<number[]>(
    "like",
    fetchLikeData,
    {
      onSuccess: (data) => {
        setLikeBooks(data);
      },
    }
  );
  const { refetch: refetchLikeList } = useQuery<IBook>(
    ["likeList"],
    fetchLikeList,
    {
      keepPreviousData: true, // 페이지 변경 시 이전 데이터 유지 하기 위함

      // 관심 작품 refetch시 데이터 다시 가져오기 위함
      onSuccess: (data) => {
        if (isFavor) {
          setBookData(data);
        }
      },
    }
  );

  const [bookData, setBookData] = useState<IBook>();
  useEffect(() => {
    setBookData(books);
  }, []);

  const setLike = async (bookId: number) => {
    await axiosApi.post(`/api/like?bookId=${bookId}`);
    refetch();
  };
  const unSetLike = async (bookId: number) => {
    await axiosApi.delete(`/api/like?bookId=${bookId}`);
    refetch();
    // 관심 작품 라우팅시 좋아요 해제 시 refetch
    if (isFavor) {
      refetchLikeList();
    }
  };

  const setFavor = (bookId: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (likeData?.includes(bookId)) {
      unSetLike(bookId);
    } else {
      setLike(bookId);
    }
  };
  return (
    <div className="grid w-full grid-cols-4 gap-4 overflow-y-auto scrollbar">
      {bookData?.content.map((book, index) => (
        <div
          key={index}
          className="border border-white rounded-2xl hover:opacity-60 w-[90%] mb-8"
        >
          <Link
            to={`/detailBook/${book.id}`}
            className="bg-center bg-cover w-[100%] h-44 rounded-t-2xl flex justify-end"
            style={{ backgroundImage: "url('/images/dog.png')" }}
          >
            <button
              onClick={(e) => setFavor(book.id, e)}
              className="bg-[#e9e8eb] w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-60 mr-2 mt-2"
            >
              {likeData?.includes(book.id) ? (
                <FaHeart className=" fill-[#6100C2] w-6 h-6" />
              ) : (
                <CiHeart className=" fill-[#6100C2] w-8 h-8" />
              )}
            </button>
          </Link>

          <div className="w-[100%] rounded-b-2xl bg-[#e9e8eb] h-20 flex flex-col justify-center px-2">
            <span className="mb-1 text-lg font-bold text-black ">
              {book.name}
            </span>
            <span className="mb-1">{book.authorName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
