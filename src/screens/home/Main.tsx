import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { IBook } from "../../interfaces/bookInterface";
import { fetchLatestData, fetchLikeData, fetchPopularData } from "../../api";
import BookSlider from "../../components/BookSlider";
import "../../css/scroll.css";
import { CiHeart } from "react-icons/ci";
import { useAppDispatch } from "../../redux/hooks";
import { setLatestBooks, setPopularBooks } from "../../redux/slices/bookSlice";
import axiosApi from "../../axios";
import { setLikeBooks } from "../../redux/slices/likeSlice";

function Main() {
  const dispatch = useAppDispatch();

  const { data: popularData } = useQuery<IBook>(
    ["popularBooks"],
    fetchPopularData,
    {
      
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchInterval: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnMount: false, // Do not refetch on mount if data is fresh
      retry: 3, // Retry up to 3 times on failure
      keepPreviousData: true, // Keep previous data while loading new data
      onSuccess: (data) => {
        console.log(data);
        dispatch(setPopularBooks(data));
        
      },
    }
  );

  const { data: latestData } = useQuery<IBook>(
    ["latestBooks"],
    fetchLatestData,
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchInterval: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnMount: false, // Do not refetch on mount if data is fresh
      retry: 3, // Retry up to 3 times on failure
      keepPreviousData: true, // Keep previous data while loading new data
      onSuccess: (data) => {
        dispatch(setLatestBooks(data));
      },
    }
  );

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

  const setFavor = (
    bookId: number | undefined,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookId) {
      if (likeData?.includes(bookId)) {
        unSetLike(bookId);
      } else {
        setLike(bookId);
      }
    }
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col ">
      <div
        className="flex flex-col justify-between  p-4 bg-center bg-cover h-[45%]"
        style={{ backgroundImage: "url('/images/dog.png')" }}
      >
        <div className="flex justify-between">
          <div></div>
          <div className="flex items-center">
            <Link to={"/search"}>
              <FaSearch className="fill-[white] w-6 h-6 hover:opacity-60 mr-4" />
            </Link>

            <img src="/images/profile.png" alt="기본 프로필 이미지" className="w-8 h-8 rounded-full" />
            <span className="ml-2 text-lg font-bold text-white">이효민</span>
          </div>
        </div>

        <div className="flex flex-col text-white">
          <span className="my-4 text-3xl font-extrabold">
            {popularData?.content[0].name}
          </span>
          <span className="mb-4">{popularData?.content[0].authorName}</span>
          <div className="flex">
            <Link
              to={`/detailBook/${popularData?.content[0].id}`}
              className="hover:opacity-60 bg-[#7C3FFF] w-28 h-12 rounded-xl font-bold flex items-center justify-center"
            >
              보러가기
            </Link>
            <button
              onClick={(e) => setFavor(popularData?.content[0].id, e)}
              className="bg-[#e9e8eb] w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-60 ml-12"
            >
              {likeData?.includes(popularData?.content[0].id || -1) ? (
                <FaHeart className=" fill-[#6100C2] w-6 h-6" />
              ) : (
                <CiHeart className=" fill-[#6100C2] w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="py-2 overflow-y-auto scrollbar">
        <div className="mt-8">
          <div className="flex items-center justify-between ">
            <span className="text-xl font-bold text-white ">인기있는 작품</span>
            <Link
              to={"/popular"}
              className="mr-2 text-sm font-bold text-gray-400 hover:opacity-60"
            >
              더보기
            </Link>
          </div>

          <BookSlider data={popularData} />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between ">
            <span className="text-xl font-bold text-white ">
              최근에 추가된 작품
            </span>
            <Link
              to={"/latest"}
              className="mr-2 text-sm font-bold text-gray-400 hover:opacity-60"
            >
              더보기
            </Link>
          </div>

          <BookSlider data={latestData} />
        </div>
      </div>
    </div>
  );
}

export default Main;
