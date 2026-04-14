import { baseApi } from "../../api/baseApi";

const paymentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ CREATE PAYOUT REQUEST
    createPayoutRequest: build.mutation({
      query: (data) => ({
        url: "/payout-request",
        method: "POST",
        body: data,
      }),

      // optional: if you have balance or payout list
      invalidatesTags: ["PayoutRequests", "UserBalance"],
    }),
    getAllWithdraw: build.query({
      query: (userId) => ({
        url: `/user-payout?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["PayoutRequests"],
    }),
  }),
});

export const { useCreatePayoutRequestMutation, useGetAllWithdrawQuery } =
  paymentApiService;
