import { configureStore } from "@reduxjs/toolkit";
import notificaionSlice from "./notificaionSlice";
import balanceSlice from "./balanceSlice";

const store = configureStore({
    reducer: {
        notification:notificaionSlice,
        balance:balanceSlice,
    }
});

export default store;