"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { IInputAddProps } from "./todo";

export default function InputAdd(props: IInputAddProps) {
  const { addTodo } = props;
  const [todoAdd, setTodoAdd] = useState({
    id: 0,
    title: "",
    status: 0,
    active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoAdd({
      ...todoAdd,
      [name]: value,
    });
  };
  return (
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
        value={todoAdd.title}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <Button
        className="border-0 px-5 fw-bold"
        style={{ backgroundColor: "#93C1D2", letterSpacing: "2px" }}
        onClick={() => {
          setTodoAdd({ ...todoAdd, id: 0, title: "" });
          return addTodo(todoAdd);
        }}
      >
        ADD
      </Button>
    </div>
  );
}
