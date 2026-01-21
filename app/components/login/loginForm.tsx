"use client";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Email</label>
          <input
            type="email"
            className="form-control py-2 rounded-3"
            placeholder="mail@abc.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-dark">Password</label>
          <input
            type="password"
            className="form-control py-2 rounded-3"
            placeholder="****************"
          />
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

        <Link
          href="./components/todos"
          className="btn btn-lg w-100 fw-bold text-white py-3 rounded-3 shadow"
          style={{ backgroundColor: "#6B2D5C" }}
        >
          Login
        </Link>
      </form>
    </>
  );
}
