import { baseApi } from "../../api/baseApi";

const bannerApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanner: build.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),


  }),
});

export const {
  useGetBannerQuery,

} = bannerApiServices;
