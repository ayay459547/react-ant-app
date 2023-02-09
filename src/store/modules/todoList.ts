import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: number
  username: string
  email: string
  address: string
  age: number
}

const initialState: UserState = {
  id: 0,
  username: '',
  email: '',
  address: '',
  age: 0
}
function getData () {
  return Promise.resolve({
    data: { test: 123 },
    code:200,
    status: 'sccuss'
  })
}
export const fetchData = createAsyncThunk("todoList/getData", async () => {
  const response = await getData()
  return response.data
})

export const counterSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, username, email, address, age } = action.payload
      state.id = id
      state.username = username
      state.email = email
      state.address = address
      state.age = age
    }
  },
  extraReducers: {
    // [fetchData.pending]: (state) => {
    //   state.loading = true;
    // },

    // [fetchData.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.entities = payload;
    // },

    // [fetchData.rejected]: (state) => {
    //   state.loading = false;
    // }
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer