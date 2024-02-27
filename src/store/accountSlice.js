import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accounts:null,
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        updateAccounts: (state, action) => {
            state.accounts = action.payload;
        },
    }
  })

  export const {updateAccounts} = accountSlice.actions;

  export default accountSlice.reducer;