import { IBook } from "../interfaces/bookInterface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchLikeData } from "../api";
import { useAppDispatch } from "../redux/hooks";
import { setLikeBooks } from "../redux/slices/likeSlice";
import axiosApi from "../axios";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

interface BookSlideProps {
  data: IBook | undefined;
}

function BookSlider({ data }: BookSlideProps) {
  const dispatch = useAppDispatch();
  const { data: likeData, refetch } = useQuery<number[]>(
    "like",
    fetchLikeData,
    {
      onSuccess: (data) => {
        dispatch(setLikeBooks(data));
      },
    }
  );

  const setLike = async (bookId: number) => {
    await axiosApi.post(`/api/like?bookId=${bookId}`);
    refetch();
  };
  const unSetLike = async (bookId: number) => {
    await axiosApi.delete(`/api/like?bookId=${bookId}`);
    refetch();
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
  const fetchImg = async () => {
    // data?.content가 undefined일 경우 빈 배열을 기본값으로 사용
    const imgs =
      data?.content?.map(async (book) => {
        const res = await axiosApi.get("/api/book/thumbnail", {
          params: {
            bookId: book.id,
          },
        });
        return res.data;
      }) || []; // 빈 배열을 기본값으로 설정

    try {
      // imgs가 빈 배열이 아닌 경우에만 Promise.all을 호출
      const imgurl = await Promise.all(imgs);
      setBookImg(imgurl);
    } catch (error) {
      console.error("Failed to fetch image URLs", error);
    }
  };

  const [bookImg, setBookImg] = useState<any>();
  useEffect(() => {
    fetchImg();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex mt-4">
      <Swiper
        spaceBetween={15}
        slidesPerView={4}
        modules={[Pagination]}
        loop={true}
        className="mySwiper"
      >
        {data?.content.map((book, index) => (
          <SwiperSlide
            key={book.id}
            className="flex flex-col items-center border border-white hover:opacity-60 rounded-2xl"
          >
            <Link
              to={`/detailBook/${book.id}`}
              className="bg-cover w-[100%] h-44 rounded-t-2xl flex justify-end"
              style={{ backgroundImage: `url('${bookImg && bookImg[index]}')` }}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BookSlider;
