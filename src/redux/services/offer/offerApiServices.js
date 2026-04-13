import { baseApi } from "../../api/baseApi";

const offerApiServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ GET Payments
    getOffer: build.query({
      query: () => `/offers`,
      providesTags: ["Offer"], // Cache tag for automatic invalidation
    }),
  }),
});

export const { useGetOfferQuery } = offerApiServices;
