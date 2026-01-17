import { PayloadAction } from "@reduxjs/toolkit";

// 1. Định nghĩa interface cho Todo
interface ITodo {
  id: number;
  title: string;
  status: number;
  active: boolean;
}

// 2. Định nghĩa interface cho State ban đầu
interface ITodoState {
  todos: ITodo[];
}

const initialState: ITodoState = {
  todos: [], // Khởi tạo mảng rỗng đúng kiểu
};

export const todoReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state; // Quan trọng: Luôn phải trả về state
  }
};
