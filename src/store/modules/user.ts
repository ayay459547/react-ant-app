import { createSlice } from '@reduxjs/toolkit'
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

export const counterSlice = createSlice({
  name: 'user',
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
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer