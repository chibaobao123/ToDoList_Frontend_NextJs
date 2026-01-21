"use client";
import Todo from "./todo";

import { Container, Row, Col } from "react-bootstrap";
export default function TodosPage() {
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
