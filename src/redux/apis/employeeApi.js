import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useFetchLateEmployeeQuery } from "./adminApi"

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/employee`, credentials: "include" }),
    tagTypes: ["employee"],
    endpoints: (builder) => {
        return {
            fetchEmployeeRequest: builder.query({
                query: () => {
                    return {
                        url: "fetch-employee-leave-request",
                        method: "GET"
                    }
                },
                providesTags: ["TeamLead"],
                transformResponse: data => data.result
            }),
            UpdateEmployeeProfile: builder.mutation({
                query: userData => {
                    return {
                        url: `/update-employee-profile/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["employee"],

            }),
            employeeLeaveRequestSend: builder.mutation({
                query: userData => {
                    return {
                        url: "/employee-leave-request",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"],
            }),
            FetchemployeeProfile: builder.query({
                query: () => {
                    return {
                        url: "/fetch-employee-profile",
                        method: "GET",

                    }
                },
                invalidatesTags: ["employee"],
                transformResponse: data => data.result
            }),
            lateEmpData: builder.query({
                query: () => {
                    return {
                        url: "/late-emp-data",
                        method: "GET",

                    }
                },
                invalidatesTags: ["employee"],
                transformResponse: data => data.result
            }),

        }
    }
})

export const {
    useEmployeeLeaveRequestSendMutation,
    useUpdateEmployeeProfileMutation,
    useFetchemployeeProfileQuery,
    useFetchEmployeeRequestQuery,
    useLazyFetchEmployeeRequestQuery,
    useLateEmpDataQuery
} = employeeApi