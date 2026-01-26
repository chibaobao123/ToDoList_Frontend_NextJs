"use client";
import RegisterForm from "./registerForm";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleLogin from "../login/googleLogin";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Container fluid className="vh-100 d-flex align-items-center bg-light">
        <Container
          className="bg-white shadow rounded-4 overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <Row>
            <Col
              md={6}
              className="d-none d-md-flex flex-column justify-content-center align-items-center p-5"
              style={{ backgroundColor: "#FDF2E9" }}
            >
              <img
                src="https://img.freepik.com/free-vector/skeleton-working-laptop-concept-illustration_114360-18451.jpg"
                alt="Illustration"
                className="img-fluid"
                style={{ maxWidth: "350px", mixBlendMode: "multiply" }}
              />
              <h2 className="fw-bold text-center" style={{ color: "#4a154b" }}>
                Turn your ideas into reality.
              </h2>
              <p className="text-muted text-center">
                Start for free and get attractive offers from the community.
              </p>
            </Col>

            {/* Cột bên phải: Form đăng ký (Ảnh 15.50.34) */}
            <Col md={6} className="p-5">
              {/* Logo */}
              <div className="mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center border border-2 border-dark rounded-1"
                  style={{
                    width: "40px",
                    height: "40px",
                    position: "relative",
                  }}
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

              {/* Google Login */}
              <GoogleLogin />

              <div className="text-center my-3 position-relative">
                <hr />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                  or Sign in with Email
                </span>
              </div>

              <RegisterForm />

              <p className="text-center mt-4 small text-muted">
                Already Registered?{" "}
                <a
                  href="/components/login"
                  className="text-decoration-none fw-bold"
                  style={{ color: "#4a154b" }}
                >
                  Login
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
