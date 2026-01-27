"use client";
import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();

  // Khởi tạo state với giá trị mặc định để tránh lỗi "uncontrolled" (Ảnh 22.51.10)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      const { status } = response.data;

      if (status !== 201) {
        throw setError("Registration failed");
      }

      setSuccess("Đăng nhập thành công!!!");

      // Đăng ký thành công, chuyển hướng đến trang đăng nhập
      setTimeout(() => {
        setError(null);
        setSuccess(null);
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold small">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="mail@abc.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {error && (
          <Alert key="danger" variant="danger">
            {error}
          </Alert>
        )}
        {success && (
          <Alert key="success" variant="success">
            {success}
          </Alert>
        )}
        <Button
          type="submit"
          className="w-100 py-2 border-0 shadow-sm"
          style={{ backgroundColor: "#4a154b" }}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
}
