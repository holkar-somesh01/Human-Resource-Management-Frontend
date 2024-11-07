import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/adminauthSlice"
import { authApi } from "./apis/authApi";
import { teamLeadApi } from "./apis/teamLeadApi";
import { employeeApi } from "./apis/employeeApi";
import { hrApi } from "./apis/hrApi";
import { adminApi } from "./apis/adminApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [teamLeadApi.reducerPath]: teamLeadApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [hrApi.reducerPath]: hrApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        Adminauth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, teamLeadApi.middleware, employeeApi.middleware, hrApi.middleware, adminApi.middleware]
})

export default reduxStore