"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { isValidEmail } from "../../utils/validations";

import { RootState } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";

export default function LoginForm() {
  const users = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
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
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });

      // 2. Lấy access_token từ dữ liệu trả về
      const { access_token } = response.data;

      if (access_token) {
        // 3. Lưu token vào localStorage (hoặc Cookies) để dùng cho các API sau
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("email", email);

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

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              style={{ accentColor: "#6B2D5C" }}
            />
            <label
              className="form-check-label small text-secondary"
              htmlFor="rememberMe"
            >
              Remember Me
            </label>
          </div>
          <a
            href="#"
            className="small fw-bold text-decoration-none"
            style={{ color: "#6B2D5C" }}
          >
            Forgot Password?
          </a>
        </div>

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
