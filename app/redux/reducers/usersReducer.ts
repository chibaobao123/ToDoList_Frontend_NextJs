import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Định nghĩa interface cho từng item Todo
export interface User {
  _id?: string; // Dấu '?' nghĩa là khi tạo mới (Add) thì chưa cần ID, DB sẽ tự tạo
  email: string;
}

// 2. Định nghĩa interface cho State
interface UserState {
  loginUser: string | null;
  users: User[];
}

const initialState: UserState = {
  loginUser: null,
  users: [],
};

// 3. Tạo Slice - Kết hợp cả Reducer và Actions vào một nơi
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Action để set thông tin user đăng nhập
    setLoginUser: (state, action: PayloadAction<string>) => {
      state.loginUser = action.payload;
    },
  },
});

// Xuất các Actions để sử dụng trong Component (dispatch)
export const { setLoginUser } = userSlice.actions;

// Xuất Reducer để đưa vào Store
export default userSlice.reducer;
