"use client";
import Todo from "./components/todo";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Ngăn Font Awesome tự thêm CSS vì đã import ở trên

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#FDF8F3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              {/* Thanh Input ADD */}
              <div
                className="d-flex mb-5 shadow-sm"
                style={{
                  borderRadius: "50px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                <Form.Control
                  placeholder="What do you need to do?"
                  className="border-0 px-4 py-3 shadow-none"
                  style={{ fontSize: "1.1rem", color: "#666" }}
                />
                <Button
                  className="border-0 px-5 fw-bold"
                  style={{ backgroundColor: "#93C1D2", letterSpacing: "2px" }}
                >
                  ADD
                </Button>
              </div>
              <Todo />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
