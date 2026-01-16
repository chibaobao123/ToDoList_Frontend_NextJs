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
              <Todo />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
