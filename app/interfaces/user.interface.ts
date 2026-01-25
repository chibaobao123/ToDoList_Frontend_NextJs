// 1. Định nghĩa interface cho từng item Todo
export interface User {
  _id?: string; // Dấu '?' nghĩa là khi tạo mới (Add) thì chưa cần ID, DB sẽ tự tạo
  email: string;
}

// 2. Định nghĩa interface cho State
export interface UserState {
  loginUser: string | null;
  rememberMe: boolean;
  users: User[];
}

export const initialState: UserState = {
  loginUser: null,
  rememberMe: false,
  users: [],
};
