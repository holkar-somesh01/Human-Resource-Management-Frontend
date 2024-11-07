import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const hrApi = createApi({
    reducerPath: "hrApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/hr`, credentials: "include" }),
    tagTypes: ["hr"],
    endpoints: (builder) => {
        return {
            getHrProfile: builder.query({
                query: () => {
                    return {
                        url: "/fetch-hr-profile",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            employeeAttendenceFetch: builder.query({
                query: () => {
                    return {
                        url: "/employee-attendence-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            teamLeadAttendenceFetch: builder.query({
                query: () => {
                    return {
                        url: "/teamlead-attendence-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            fetchEmployees: builder.query({
                query: () => {
                    return {
                        url: "/fetch-employee",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            fetchTeamLeads: builder.query({
                query: () => {
                    return {
                        url: "/fetch-teamlead",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            updateHrProfile: builder.mutation({
                query: userData => {
                    return {
                        url: `/update-hr-profile/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["hr"]
            }),
            findserchemployee: builder.mutation({
                query: userData => {
                    return {
                        url: "/find-employee",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            findemployeeleaverequest: builder.query({
                query: () => {
                    return {
                        url: "fetch-request",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            updateLeaveRequest: builder.mutation({
                query: userData => {
                    return {
                        url: `/update-leave/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                providesTags: ["hr"],
            }),
            fetchTeamLeadLeaveRequest: builder.query({
                query: () => {
                    return {
                        url: "/fetch-teamlead-request",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            FetchHRProfile: builder.query({
                query: () => {
                    return {
                        url: `/fetch-hr-profile`,
                        method: "GET",
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result[0]

            }),
            FetchRequestStatus: builder.query({
                query: () => {
                    return {
                        url: `/fetch-request-status`,
                        method: "GET",
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
            SendLeaveRequest: builder.mutation({
                query: userData => {
                    return {
                        url: '/leave-request-hr',
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["TeamLead"]
            }),
            handleSearch: builder.mutation({
                query: userData => {
                    return {
                        url: '/handle-search-hr',
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["TeamLead"]
            }),
            LateHrsData: builder.query({
                query: () => {
                    return {
                        url: "/late-hr-data",
                        method: "GET"
                    }
                },
                providesTags: ["hr"],
                transformResponse: data => data.result

            }),
        }
    }
})

export const {
    useGetHrProfileQuery,
    useUpdateHrProfileMutation,
    useFindserchemployeeMutation,
    useFindemployeeleaverequestQuery,
    useLazyFindemployeeleaverequestQuery,
    useUpdateLeaveRequestMutation,
    useFetchTeamLeadLeaveRequestQuery,
    useLazyFetchTeamLeadLeaveRequestQuery,
    useLazyFetchEmployeesQuery,
    useFetchTeamLeadsQuery,
    useEmployeeAttendenceFetchQuery,
    useTeamLeadAttendenceFetchQuery,
    useFetchHRProfileQuery,
    useSendLeaveRequestMutation,
    useFetchRequestStatusQuery,
    useLazyFetchRequestStatusQuery,
    useHandleSearchMutation,
    useLateHrsDataQuery,
} = hrApi