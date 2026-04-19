import { baseApi } from "../../api/baseApi";


export const taskApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get completed tasks for a user
    getCompletedTasks: builder.query({
      query: (userId) => `/tasks/complete/${userId}`,
      providesTags: ["Tasks"], // Cache tag for automatic invalidation
    }),
    getTask: builder.query({
        query: () => `/tasks`,
      providesTags: ["Tasks"], // Cache tag for automatic invalidation
    })
,
    // 2️⃣ Complete a task
    completeTask: builder.mutation({
      query: ({ userId, taskId }) => ({
        url: "/task/complete",
        method: "PATCH",
        body: { userId, taskId },
      }),
      invalidatesTags: ["Tasks"], // Refresh task list after completion
    }),
    payUser:builder.mutation({
       query: ({ userId, amount,invite }) => ({
        url: "/tasks/pay-user",
        method: "POST",
        body: { userId, amount, invite },
      }),
      invalidatesTags: [{ type: "Balance", id: "USER_BALANCE" }]
    })
    

    
  }),
  overrideExisting: false, // ensures this doesn't break existing endpoints
});

// ✅ Export hooks for components
export const {
  useGetCompletedTasksQuery,
  useCompleteTaskMutation,
  useGetTaskQuery,
  usePayUserMutation
} = taskApiServices;