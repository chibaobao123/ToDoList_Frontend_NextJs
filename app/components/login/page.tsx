"use client";
import GoogleLogin from "./googleLogin";
import LoginForm from "./loginForm";
import RegisterButton from "./registerButton";

export default function LoginPage() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-5"
      style={{ backgroundColor: "#FDF2E9" }}
    >
      {/* Container chính */}
      <div
        className="container-fluid max-w-lg bg-white shadow-sm d-flex flex-column flex-md-row overflow-hidden p-0"
        style={{ borderRadius: "3rem", maxWidth: "1140px" }}
      >
        {/* BÊN TRÁI: Khu vực minh họa */}
        <div
          className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center p-5"
          style={{ backgroundColor: "#FDF2E9" }}
        >
          <div className="mb-4 text-center">
            {/* Ảnh minh họa */}
            <img
              src="https://img.freepik.com/free-vector/skeleton-working-laptop-concept-illustration_114360-18451.jpg"
              alt="Illustration"
              className="img-fluid"
              style={{ maxWidth: "350px", mixBlendMode: "multiply" }}
            />
          </div>
          <div className="text-center">
            <h2 className="fw-bold mb-3" style={{ color: "#4A154B" }}>
              Turn your ideas into reality.
            </h2>
            <p className="text-muted fs-5">
              Start for free and get attractive offers from the community
            </p>
          </div>
        </div>

        {/* BÊN PHẢI: Form đăng nhập */}
        <div className="col-12 col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
            {/* Logo */}
            <div className="mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center border border-2 border-dark rounded-1"
                style={{ width: "40px", height: "40px", position: "relative" }}
              >
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "black",
                    position: "absolute",
                  }}
                ></div>
                <div
                  style={{
                    height: "2px",
                    width: "100%",
                    backgroundColor: "black",
                    position: "absolute",
                  }}
                ></div>
              </div>
            </div>

            <h1 className="h2 fw-bold text-dark mb-1">Login to your Account</h1>
            <p className="text-secondary mb-4 small">
              See what is going on with your business
            </p>

            {/* Google Login */}
            <GoogleLogin />

            {/* Divider */}
            <div className="d-flex align-items-center mb-4 text-secondary">
              <hr className="flex-grow-1" />
              <span className="mx-2 small fst-italic">
                or Sign in with Email
              </span>
              <hr className="flex-grow-1" />
            </div>

            {/* Form */}
            <LoginForm />

            {/* Register button */}
            <RegisterButton />
          </div>
        </div>
      </div>
    </div>
  );
}
