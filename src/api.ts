import axiosApi from "./axios";

export const fetchBookData = async (searchCond: string, page: number) => {
  const { data } = await axiosApi.get("/api/book/list/search", {
    params: {
      searchCond,
      page,
    },
  });
  return data;
};

export const fetchPopularData = () => fetchBookData("popular", 0);
export const fetchLatestData = () => fetchBookData("latest", 0);

export const fetchLikeData = async () => {
  const { data } = await axiosApi.get("/api/like");

  return data;
};

export const fetchLikeList = async () => {
  const { data } = await axiosApi.get("/api/book/liked-list");
  return data;
};
