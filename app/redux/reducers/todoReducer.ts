import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Định nghĩa interface cho từng item Todo
export interface ITodo {
  id: number;
  title: string;
  status: number;
  active: boolean;
}

// 2. Định nghĩa interface cho State
interface ITodoState {
  todos: ITodo[];
}

const initialState: ITodoState = {
  todos: [
    { id: 1, title: "go to gym", status: 0, active: true },
    { id: 2, title: "play badminton", status: 2, active: true },
    { id: 3, title: "coffee time", status: 1, active: true },
  ],
};

// 3. Tạo Slice - Kết hợp cả Reducer và Actions vào một nơi
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Action thêm Todo: PayloadAction<ITodo> đảm bảo dữ liệu truyền vào đúng kiểu
    addTodo: (state, action: PayloadAction<ITodo>) => {
      // Với createSlice, bạn có thể .push trực tiếp nhờ thư viện Immer
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.map((item) => {
        if (item.id === action.payload && item.active) {
          return { ...item, active: false };
        }
        return item;
      });
      state.todos = todo;
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const updatedLists = [...state.todos];
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        updatedLists[index] = action.payload;
        state.todos = updatedLists;
      }
    },
  },
});

// Xuất các Actions để sử dụng trong Component (dispatch)
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

// Xuất Reducer để đưa vào Store
export default todoSlice.reducer;
