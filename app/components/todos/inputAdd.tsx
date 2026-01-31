"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { RootState } from "../../redux/configStore"; // Import kiểu RootState bạn đã định nghĩa
import { useSelector, useDispatch } from "react-redux";
// Import action từ file slice
import { ITodo } from "../../interfaces/todo.interface";
import { addTodo } from "../../redux/reducers/todoReducer";

import axios from "axios";

export default function InputAdd() {
  // Lấy dữ liệu từ slice 'todos'
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setNewTodo(value || "");
  };
  const addNewTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      // Tạo object đúng kiểu ITodo mà Redux đang chờ
      const todoToDispatch: ITodo = {
        title: newTodo,
        status: 0,
        active: true,
      };
      const token = localStorage.getItem("access_token");

      // 1. Gọi API gửi lên DB
      const response = await axios.post("http://localhost:3001/todo", {
        todoToDispatch,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataFromServer = await response.data;

      // 2. Sau khi DB có dữ liệu, mới cập nhật Redux
      dispatch(addTodo(dataFromServer));

      setNewTodo(""); // Reset ô input
    } catch (err: unknown) {
      // Thay 'any' bằng kiểm tra instance hoặc ép kiểu an toàn
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Thêm Todo thất bại!";
        console.log(message);
      } else {
        console.log("Đã xảy ra lỗi không xác định");
      }
    }
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
        value={newTodo}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <Button
        className="border-0 px-5 fw-bold"
        style={{ backgroundColor: "#93C1D2", letterSpacing: "2px" }}
        onClick={() => addNewTodo()}
      >
        ADD
      </Button>
    </div>
  );
}
