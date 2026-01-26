"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GoogleLogin() {
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Gửi access_token nhận từ Google về Server của bạn
        const res = await axios.post("http://localhost:3001/auth/google", {
          token: tokenResponse.access_token,
        });

        // Lưu token hệ thống và email vào localStorage
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("email", res.data.email);

        // Điều hướng sang trang todos
        router.push("./components/todos");
      } catch (err: unknown) {
        // Dùng unknown để hết gạch đỏ any
        if (axios.isAxiosError(err)) {
          console.error("Google Login Error:", err.response?.data);
        }
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <>
      <button
        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2 mb-4 rounded-3 shadow-sm border-light-subtle"
        onClick={() => handleGoogleLogin()}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="18"
          height="18"
        />
        <span className="fw-semibold text-dark small">
          Continue with Google
        </span>
      </button>
    </>
  );
}
