import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./reducers/todoReducer"; // Giả sử bạn có slice này

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer,
    },
  });
};

// Định nghĩa các type cho TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
