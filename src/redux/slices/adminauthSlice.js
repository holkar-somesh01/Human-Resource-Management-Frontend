import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        hr: JSON.parse(localStorage.getItem("hr")),
        teamLead: JSON.parse(localStorage.getItem("teamLead")),
        employee: JSON.parse(localStorage.getItem("employee")),
    },
    reducers: {
        adminLogout: (state, { payload }) => {
            localStorage.removeItem("admin")
            state.admin = null
        },
        HRLogout: (state, { payload }) => {
            localStorage.removeItem("hr")
            state.admin = null
        },
        TeamLeadLogout: (state, { payload }) => {
            localStorage.removeItem("teamLead")
            state.admin = null
        },
        EmployeeLogout: (state, { payload }) => {
            localStorage.removeItem("employee")
            state.admin = null
        },
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.LoginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.LogoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        .addMatcher(authApi.endpoints.loginHR.matchFulfilled, (state, { payload }) => {
            state.hr = payload
        })
        .addMatcher(authApi.endpoints.logoutHR.matchFulfilled, (state, { payload }) => {
            state.hr = null
        })
        .addMatcher(authApi.endpoints.loginTeamLead.matchFulfilled, (state, { payload }) => {
            state.teamLead = payload
        })
        .addMatcher(authApi.endpoints.logoutTeamLead.matchFulfilled, (state, { payload }) => {
            state.teamLead = null
        })
        .addMatcher(authApi.endpoints.loginEmployee.matchFulfilled, (state, { payload }) => {
            state.employee = payload
        })
        .addMatcher(authApi.endpoints.logoutEmployee.matchFulfilled, (state, { payload }) => {
            state.employee = null
        })

})
export const {
    adminLogout,
    HRLogout,
    TeamLeadLogout,
    EmployeeLogout
} = authSlice.actions
export default authSlice.reducer