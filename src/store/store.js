import { configureStore } from "@reduxjs/toolkit";
import notificaionSlice from "./notificaionSlice";
import balanceSlice from "./balanceSlice";
import accountSlice from "./accountSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        notification:notificaionSlice,
        balance:balanceSlice,
        accounts:accountSlice,
        auth:authSlice,
    }
});

export default store;