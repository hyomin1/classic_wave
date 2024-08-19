import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosApi from "../../axios";

function Main() {
  const fetchData = async () => {
    const res = await axiosApi.get("/api/book/list/search", {
      params: {
        searchCond: "popular",
      },
    });
    console.log(res.data);
  };

  const fetchMetaData = async () => {
    // 상세보기
    // secentList가 그림책 만드는 데이터
    const res = await axiosApi.get("/api/book/metadata", {
      params: {
        bookId: 1,
      },
    });
    console.log(res.data);
  };
  useEffect(() => {
    //fetchData();
    fetchMetaData();
  }, []);
  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col ">
      <div className="flex flex-col items-end p-4 h-80 bg-violet-500">
        <div className="flex ">
          <Link to={"/search"}>
            <FaSearch className="fill-[white] w-6 h-6 hover:opacity-60" />
          </Link>

          <img alt="img1" />
          <span>이름</span>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="mt-8">
          <span className="text-xl font-bold text-white">인기있는 작품</span>
          <div className="flex mt-4">
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
          </div>
        </div>

        <div>
          <span className="text-xl font-bold text-white">
            최근에 추가된 작품
          </span>
          <div className="flex mt-4">
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
            <img
              alt="img1"
              className="w-40 mr-4 border border-white h-52 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
