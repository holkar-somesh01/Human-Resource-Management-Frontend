import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            RegisterAdmin: builder.mutation({
                query: () => {
                    return {
                        url: "/register-admin",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),
            LoginAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                }
            }),
            LogoutAdmin: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }
            }),
            addHR: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-hr",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            loginHR: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-hr",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("hr", JSON.stringify(data.result))
                    return data.result
                }
            }),
            addEmployee: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-employee",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            logoutHR: builder.mutation({
                query: userData => {
                    return {
                        url: `/logout-hr/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("hr")
                    return data.result
                }
            }),
            loginTeamLead: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-teamLead",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("teamLead", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutTeamLead: builder.mutation({
                query: userData => {
                    return {
                        url: `/logout-teamLead/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("teamLead")
                    return data.result
                }
            }),
            loginEmployee: builder.mutation({
                query: userData => {
                    return {
                        url: "login-employee",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("employee", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutEmployee: builder.mutation({
                query: userData => {
                    return {
                        url: `/logout-employee/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("employee")
                    return data.result
                }
            }),

        }
    }
})

export const {
    useRegisterAdminMutation,
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useAddHRMutation,
    useLoginHRMutation,
    useAddEmployeeMutation,
    useLogoutHRMutation,
    useLoginTeamLeadMutation,
    useLogoutTeamLeadMutation,
    useLoginEmployeeMutation,
    useLogoutEmployeeMutation
} = authApi