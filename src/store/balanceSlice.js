import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    balance:null,
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        updateBalance: (state, action) => {
            state.balance = action.payload;
        },
    }
  })

  export const {updateBalance } = balanceSlice.actions;

  export default balanceSlice.reducer;