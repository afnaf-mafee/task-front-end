import { baseApi } from "../../api/baseApi";

const topEarnerApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ GET TOP EARNERS
    getTopEarners: build.query({
      query: (limit = 13) => ({
        url: `/top-earners?limit=${limit}`,
        method: "GET",
      }),

      providesTags: ["TopEarners"],
    }),
  }),
});

export const { useGetTopEarnersQuery } = topEarnerApiService;
