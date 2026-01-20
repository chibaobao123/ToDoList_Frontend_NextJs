import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Định nghĩa interface cho từng item Todo
export interface ITodo {
  _id?: string; // Dấu '?' nghĩa là khi tạo mới (Add) thì chưa cần ID, DB sẽ tự tạo
  title: string;
  status: number;
  active: boolean;
}

// 2. Định nghĩa interface cho State
interface ITodoState {
  todos: ITodo[];
}

const initialState: ITodoState = {
  todos: [],
};

// 3. Tạo Slice - Kết hợp cả Reducer và Actions vào một nơi
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Action thêm Todo: PayloadAction<ITodo> đảm bảo dữ liệu truyền vào đúng kiểu
    getTodo: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      // Với createSlice, bạn có thể .push trực tiếp nhờ thư viện Immer
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.map((item) => {
        if (item._id === action.payload && item.active) {
          return { ...item, active: false };
        }
        return item;
      });
      state.todos = todo;
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.todos.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (index !== -1) {
        state.todos[index] = action.payload; // Cập nhật dữ liệu mới vào Store
      }
    },
    deleteAllTodoCompled: (state, action: PayloadAction<void>) => {
      state.todos.map((item) => {
        if (item.status === 1 && item.active) {
          return {
            ...item,
            active: false,
          };
        }
      });
    },
  },
});

// Xuất các Actions để sử dụng trong Component (dispatch)
export const {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodoCompled,
} = todoSlice.actions;

// Xuất Reducer để đưa vào Store
export default todoSlice.reducer;
