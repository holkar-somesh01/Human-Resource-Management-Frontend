import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const teamLeadApi = createApi({
    reducerPath: "teamLeadApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/teamlead`, credentials: "include" }),
    tagTypes: ["TeamLead"],
    endpoints: (builder) => {
        return {
            fetchTeamLeadProfile: builder.query({
                query: () => {
                    return {
                        url: "/fetch-teamLead-profile",
                        method: "GET"
                    }
                },
                providesTags: ["TeamLead"],
                transformResponse: data => data.result
            }),
            fetchTeamLeadRequest: builder.query({
                query: () => {
                    return {
                        url: "/fetch-teamLead-request",
                        method: "GET"
                    }
                },
                providesTags: ["TeamLead"],
                transformResponse: data => data.result
            }),
            updateTeamLeadProfile: builder.mutation({
                query: userData => {
                    return {
                        url: `/update-teamLead-profile/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["TeamLead"]
            }),
            handleSearch: builder.query({
                query: () => {
                    return {
                        url: "/handle-search-teamLead",
                        method: "GET"
                    }
                },
                providesTags: ["TeamLead"],
                transformResponse: data => data.result
            }),
            LeaveRequestSend: builder.mutation({
                query: userData => {
                    return {
                        url: 'leave-request-teamlead',
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["TeamLead"]
            }),
            lateTeamLeadData: builder.query({
                query: () => {
                    return {
                        url: "/late-team-data",
                        method: "GET",

                    }
                },
                invalidatesTags: ["TeamLead"],
                transformResponse: data => data.result
            }),
        }
    }
})

export const {
    useFetchTeamLeadProfileQuery,
    useUpdateTeamLeadProfileMutation,
    useHandleSearchQuery,
    useLeaveRequestSendMutation,
    useFetchTeamLeadRequestQuery,
    useLateTeamLeadDataQuery
} = teamLeadApi