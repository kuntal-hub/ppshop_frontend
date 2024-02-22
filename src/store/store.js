import { configureStore } from "@reduxjs/toolkit";
import notificaionSlice from "./notificaionSlice";

const store = configureStore({
    reducer: {
        notification:notificaionSlice,
    }
});

export default store;