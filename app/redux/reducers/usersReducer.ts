import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState, initialState } from "../../interfaces/user.interface";

// 3. Tạo Slice - Kết hợp cả Reducer và Actions vào một nơi
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Action để set thông tin user đăng nhập
    setLoginUser: (state, action: PayloadAction<string>) => {
      state.loginUser = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
  },
});

// Xuất các Actions để sử dụng trong Component (dispatch)
export const { setLoginUser, setRememberMe } = userSlice.actions;

// Xuất Reducer để đưa vào Store
export default userSlice.reducer;
