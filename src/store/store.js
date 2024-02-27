import { configureStore } from "@reduxjs/toolkit";
import notificaionSlice from "./notificaionSlice";
import balanceSlice from "./balanceSlice";
import accountSlice from "./accountSlice";

const store = configureStore({
    reducer: {
        notification:notificaionSlice,
        balance:balanceSlice,
        accounts:accountSlice,
    }
});

export default store;