// 1. Định nghĩa interface cho từng item Todo
export interface ITodo {
  _id?: string; // Dấu '?' nghĩa là khi tạo mới (Add) thì chưa cần ID, DB sẽ tự tạo
  title: string;
  status: number;
  active: boolean;
}

// 2. Định nghĩa interface cho State
export interface ITodoState {
  todos: ITodo[];
}

export const initialState: ITodoState = {
  todos: [],
};
