import { baseApi } from "../../api/baseApi";

export const notificationApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET Notifications
    getNotifications: builder.query({
    query: (userId) => `user-notification/${userId}`,
      providesTags: ["Notifications"],
    }),

  

  }),
});export const {
  useGetNotificationsQuery,
  
} = notificationApiServices;