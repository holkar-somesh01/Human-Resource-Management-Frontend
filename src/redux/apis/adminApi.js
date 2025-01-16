import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            gethandleSearch: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/handle-search-admin",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchEmployees: builder.query({
                query: () => {
                    return {
                        url: "/fetch-employee",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result

            }),
            fetchTeamLeads: builder.query({
                query: () => {
                    return {
                        url: "/fetch-teamlead",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result

            }),
            fetchHRLeave: builder.query({
                query: () => {
                    return {
                        url: "/fetch-hr-leave",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchHR: builder.query({
                query: () => {
                    return {
                        url: "/fetch-hr",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            UpdateHrLeave: builder.mutation({
                query: (userData) => {
                    return {
                        url: `/update-hr-leave/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchLateEmployee: builder.query({
                query: () => {
                    return {
                        url: "/fetch-late-employee",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchAbsentEmployee: builder.query({
                query: () => {
                    return {
                        url: "/fetch-absent-employee",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            AdminLateEmployee: builder.query({
                query: () => {
                    return {
                        url: "/admin-late-employee",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            AbsendEmployees: builder.query({
                query: (absentData) => {
                    return {
                        url: "/admin-absent-employee",
                        method: "POST",
                        body: absentData
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
        }
    }
})

export const {
    useGethandleSearchMutation,
    useLazyFetchEmployeesQuery,
    useLazyFetchTeamLeadsQuery,
    useFetchTeamLeadsQuery,
    useFetchHRLeaveQuery,
    useLazyFetchHRLeaveQuery,
    useLazyFetchHRQuery,
    useUpdateHrLeaveMutation,
    useFetchAbsentEmployeeQuery,
    useFetchLateEmployeeQuery,
    useAdminLateEmployeeQuery,
    useAbsendEmployeesQuery,
} = adminApi