import { configureStore } from "@reduxjs/toolkit";
// Import mặc định từ file todoSlice (chính là todoSlice.reducer)
import todoReducer from "./reducers/todoReducer";
import usersReducer from "./reducers/usersReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Key này phải khớp với cách bạn truy cập trong useSelector
      // (ví dụ: state.todoReducer.todos)
      todoReducer: todoReducer,
      usersReducer: usersReducer,
    },
  });
};

// Định nghĩa các type cho TypeScript (Giữ nguyên phần này)
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
