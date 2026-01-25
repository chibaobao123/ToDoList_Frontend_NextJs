import { jwtDecode } from "jwt-decode";

// Định nghĩa cấu trúc của Token để TypeScript hiểu
interface MyJwtPayload {
  exp: number; // Thời gian hết hạn
  sub: string; // User ID
  email: string;
}

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    const decoded: MyJwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
    // Trả về true nếu thời gian hết hạn (exp) lớn hơn thời gian hiện tại
    return decoded.exp > currentTime;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkTokenExist = (): boolean | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  return true;
};

export const checkEmailExist = (): object => {
  const email = localStorage.getItem("email");
  if (!email)
    return {
      ex: false,
      email,
    };
  return { ex: true, email };
};
