import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification:null,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        removeNotification: (state) => {
            state.notification = null;
        },
    },
  })

  export const {setNotification,removeNotification } = notificationSlice.actions;

  export default notificationSlice.reducer;