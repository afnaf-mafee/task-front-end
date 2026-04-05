import { baseApi } from "../../api/baseApi";

export const authApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // CREATE USER 
    createUser: build.mutation({
      query: (userData) => ({
        url: "/create-user",
        method: "POST",
        body: userData,
      }),
    }),

    //  LOGIN USER
    loginUser: build.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),

  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
} = authApiService;