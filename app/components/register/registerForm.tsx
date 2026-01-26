"use client";
import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  // Khởi tạo state với giá trị mặc định để tránh lỗi "uncontrolled" (Ảnh 22.51.10)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <Form>
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

        <Form.Group className="mb-4 d-flex justify-content-between">
          <Form.Check
            type="checkbox"
            id="rememberMe"
            label="Remember Me"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        </Form.Group>

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
