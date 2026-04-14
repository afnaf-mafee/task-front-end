import { baseApi } from "../../api/baseApi";

const paymentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // ✅ GET Payments
    getMethods: build.query({
        query: () => `/payment-gateway`,
      providesTags: ["Tasks"], // Cache tag for automatic invalidation
    }),

    // ✅ ADD PAYMENT (POST)
    addPayment: build.mutation({
      query: (paymentData) => ({
        url: "/add-payment",
        method: "POST",
        body: paymentData,
      }),

      // auto refetch payments list after add
      invalidatesTags: ["AllPayments"],
    }),
       // ✅ GET ALL PAYMENTS BY USER ID
    getAllPayments: build.query({
      query: (userId) => ({
        url: `/user-payments?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["AllPayments"],
    }),

  }),
});

export const {
  useGetMethodsQuery,
  useAddPaymentMutation,   
  useGetAllPaymentsQuery
} = paymentApiService;