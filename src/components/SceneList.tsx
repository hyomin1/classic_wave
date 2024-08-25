import React, { useEffect, useState } from "react";
import { IScene } from "../interfaces/bookInterface";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillSound } from "react-icons/ai";

import "../css/scroll.css";
import axiosApi from "../axios";

interface ISceneList {
  sceneList: IScene[];
}
function SceneList({ sceneList }: ISceneList) {
  console.log(sceneList);
  const [page, setPage] = useState(0);
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const [thumbnail, setThumbnail] = useState<string>("");
  const getImg = async (sceneId: number) => {
    const res = await axiosApi.get(`/api/scene/${sceneId}`, {});
    console.log(res.data);
    return res.data.imageUrl;
  };
  useEffect(() => {
    if (sceneList[page]) {
      getImg(sceneList[page].id).then((url) => setThumbnail(url));
    }
  }, [page, sceneList]);

  return (
    <div className="flex items-center justify-between h-[80%]">
      <div className="w-[100%] h-[100%]">
        {sceneList.map(
          (scene, index) =>
            page === index && (
              <div key={index} className="w-[100%] h-[60%] flex flex-col">
                <img
                  src={thumbnail}
                  alt="scene"
                  className="w-[100%] h-[100%] transition duration-300 ease-in-out"
                />
                <div className="flex justify-between h-[10%] my-16">
                  {page !== 0 ? (
                    <IoIosArrowBack
                      onClick={handlePrevPage}
                      className="w-8 h-8 fill-white hover:opacity-60 bg-inherit"
                    />
                  ) : (
                    <div></div>
                  )}
                  {page !== 8 ? (
                    <IoIosArrowForward
                      onClick={handleNextPage}
                      className="w-8 h-8 fill-white hover:opacity-60"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="bg-[#7C3FFF] w-[100%] h-[50%] p-20 text-white font-bold text-xl overflow-y-auto scrollbar flex items-center">
                  <span>{scene.plotSummary}</span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default SceneList;
