import axiosApi from "./axios";

export const fetchBookData = async (searchCond: string) => {
  const { data } = await axiosApi.get("/api/book/list/search", {
    params: {
      searchCond,
    },
  });
  return data;
};

export const fetchPopularData = () => fetchBookData("popular");
export const fetchLatestData = () => fetchBookData("latest");
