import React, { useEffect, useState } from "react";
import axiosApi from "../../axios";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IBookDetail } from "../../interfaces/bookInterface";
import { useAppDispatch } from "../../redux/hooks";
import { setCartoon } from "../../redux/slices/cartoonSlice";
import { getImg } from "../../api";

interface ISearchProps {
  display: number;
  items: {
    author: string;
    description: string;
    discount: string;
    image: string;
    isbn: string;
    link: string;
    title: string;
  }[];
}

function SearchMain() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  // 0번 초기상태 1번 저장되어있음 2번 책 저장 안되어있음

  const [isStore, setIsStore] = useState(0);
  const [searchBook, setSearchBook] = useState<ISearchProps>();
  const [book, setBook] = useState<IBookDetail>();

  const [thumbnail, setThumbnail] = useState("");

  const dispatch = useAppDispatch();

  const goCartoon = (bookId: number) => {
    navigate(`/cartoon/${bookId}`);
  };

  const applicantBook = async (isbnId: string, name: string) => {
    const res = await axiosApi.post("/api/book", {
      isbnId,
      name,
    });
  };

  useEffect(() => {
    if (isStore === 1 && book) {
      getImg(book?.id).then((data) => {
        setThumbnail(data);
      });
    }
  }, [book, isStore]);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axiosApi.get("/api/book/search", {
      params: {
        searchText: title,
      },
    });

    if (res.data.id) {
      setBook(res.data);
      dispatch(setCartoon(res.data));
      setIsStore(1);
    } else {
      setSearchBook(res.data);
      setIsStore(2);
    }

    setTitle("");
  };
  const handleQuizStart = () => {
    navigate("/quiz", { state: { book } });
  };

  return (
    <div className="w-[80%] bg-[#21201E] pl-4 flex flex-col ">
      <form onSubmit={handleSubmit} className="p-4 w-[100%]  flex items-center">
        <input
          value={title}
          onChange={onChangeInput}
          className="w-[80%] bg-[#71706F] p-2 text-white rounded-xl"
          placeholder="책 제목을 입력해주세요"
        />
        <FaSearch className="fill-[white] w-6 h-6 hover:opacity-60 ml-4" />
        <Link
          to={"/home"}
          className="ml-4 text-xl font-bold text-white hover:opacity-60"
        >
          취소
        </Link>
      </form>
      {book && (
        <div className=" w-[80%] p-8 bg-[#383739] rounded-2xl mt-20">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex items-center w-[100%]">
              <img
                alt="img"
                src={isStore === 1 ? thumbnail : searchBook?.items[0].image}
                className="mr-8 w-28 h-28 rounded-xl"
              />

              <div className="flex flex-col items-start w-[100%]">
                <span className="text-2xl font-bold text-white">
                  {isStore === 1 ? book?.name : searchBook?.items[0].title}
                </span>
                <div className="flex items-center justify-between w-[100%]">
                  <span className="text-white">
                    {isStore === 1
                      ? book.authorName
                      : searchBook?.items[0].author}
                  </span>
                  {isStore === 1 && book ? (
                    <div className="font-bold text-white">
                      <button
                        onClick={() => goCartoon(book.id)}
                        className="bg-[#7C3FFF] w-32 h-10 rounded-lg hover:opacity-60 mx-2"
                      >
                        줄거리 보기
                      </button>
                      <button
                        onClick={handleQuizStart}
                        className="bg-[#7C3FFF] w-32 h-10 rounded-lg hover:opacity-60 mx-2"
                      >
                        퀴즈 풀기
                      </button>
                    </div>
                  ) : (
                    <div className="font-bold text-white">
                      {searchBook && (
                        <button
                          onClick={() =>
                            applicantBook(
                              searchBook?.items[0].isbn,
                              searchBook?.items[0].title
                            )
                          }
                          className="bg-[#7C3FFF] w-32 h-10 rounded-lg hover:opacity-60 mx-2"
                        >
                          책 신청
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchMain;
