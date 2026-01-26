"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { isValidEmail } from "../../utils/validations";

import { RootState } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser, setRememberMe } from "../../redux/reducers/usersReducer";

import RememberMe from "./rememberMe";

export default function LoginForm() {
  const { rememberMe, loginUser } = useSelector(
    (state: RootState) => state.usersReducer,
  );
  const dispatch = useDispatch();

  const [email, setEmail] = useState(loginUser || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trang web load lại
    setError("");

    if (!isValidEmail(email) || email.trim() === "") {
      setErrorEmail("Định dạng email không hợp lệ!");
      return;
    } else {
      setErrorEmail("");
    }

    if (password.trim() === "") {
      setErrorPassword("Mật khẩu không được để trống!");
      return;
    } else {
      setErrorPassword("");
    }

    try {
      // 1. Gửi yêu cầu đăng nhập đến Backend NestJS
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      // 2. Lấy access_token từ dữ liệu trả về
      const { access_token } = response.data;

      if (access_token) {
        // 3. Lưu token vào localStorage (hoặc Cookies) để dùng cho các API sau
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("email", email);
        if (rememberMe) {
          localStorage.setItem("rememberMe", rememberMe.toString());
        }
        dispatch(setLoginUser(email));
        // Cập nhật Redux với thông tin user đăng nhập
        // 4. Chuyển hướng sang trang danh sách công việc (todos)
        router.push("./components/todos");
      }
    } catch (err: unknown) {
      // Thay 'any' bằng kiểm tra instance hoặc ép kiểu an toàn
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Đăng nhập thất bại!";
        setError(message);
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    }
  };

  useEffect(() => {
    // Nếu đã chọn Remember Me, tự động điền email
    if (rememberMe) {
      const emailExist = localStorage.getItem("email") || "";
      dispatch(setLoginUser(emailExist));
    }
  }, [rememberMe]);

  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Email</label>
          <input
            type="email"
            className={
              "form-control py-2 rounded-3" +
              `form-control ${error || errorEmail ? "is-invalid" : ""}`
            }
            placeholder="mail@abc.com"
            defaultValue={rememberMe ? loginUser || "" : ""}
            required={true}
            onChange={(e) => handleChange(e)}
          />
          {errorEmail && <div className="invalid-feedback">{errorEmail}</div>}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Password</label>
          <input
            type="password"
            className={
              "form-control py-2 rounded-3" +
              `form-control ${error || errorPassword ? "is-invalid" : ""}`
            }
            placeholder="****************"
            onChange={(e) => handleChange(e)}
            required={true}
          />
          {errorPassword && (
            <div className="invalid-feedback">{errorPassword}</div>
          )}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <RememberMe />

        <button
          type="submit"
          onClick={(e) => handleLogin(e)}
          className="btn btn-lg w-100 fw-bold text-white py-3 rounded-3 shadow"
          style={{ backgroundColor: "#6B2D5C" }}
        >
          Login
        </button>
      </form>
    </>
  );
}
