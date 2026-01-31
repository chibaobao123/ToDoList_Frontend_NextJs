"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { RootState } from "../../redux/configStore"; // Import kiểu RootState bạn đã định nghĩa
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

// Import action từ file slice
import { getTodo } from "../../redux/reducers/todoReducer";
import { ITodo } from "../../interfaces/todo.interface";

import Modals from "./modal";
import InputAdd from "./inputAdd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Card } from "react-bootstrap";
import {
  faCircle,
  faCheckCircle,
  faTrashAlt,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

// Interface represents all the Props of the Component
export interface IModalProps {
  todo: ITodo;
  showModal: boolean;
  editTitle: string;
  handleClose: () => void;
}

export default function Todo() {
  // Lấy dữ liệu từ slice 'todos'
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const router = useRouter();

  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState("Edited");

  const [todo, setTodo] = useState<ITodo>({
    title: "",
    status: 0,
    active: true,
  });

  const getTodoOnServer = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // 1. Gửi yêu cầu đăng nhập đến Backend NestJS
      const response = await axios.get("http://localhost:3001/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Lấy access_token từ dữ liệu trả về
      dispatch(getTodo(response.data));
    } catch (err: unknown) {
      // Thay 'any' bằng kiểm tra instance hoặc ép kiểu an toàn
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Không tải được To do list!";
        console.log(message);
      } else {
        console.log("Đã xảy ra lỗi không xác định");
      }
    }
  };

  useEffect(() => {
    getTodoOnServer();
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (todo: ITodo) => {
    setEditTitle("Edited");
    handleShow();

    setTodo(todo);
  };

  const handleDelete = (todo: ITodo) => {
    setEditTitle("Delete");
    handleShow();

    setTodo(todo);
  };

  const handleDeleteCompleted = async () => {
    try {
      // Gửi request PATCH tới endpoint xử lý hàng loạt
      const response = await fetch(
        "http://localhost:3001/todo/remove-completed",
        {
          method: "PATCH",
        },
      );

      if (response.ok) {
        // Sau khi DB cập nhật xong, bạn cần load lại dữ liệu hoặc dispatch
        // một action Redux để cập nhật giao diện (ẩn các item đã xong)
        const data = await fetch("http://localhost:3001/todo").then((res) =>
          res.json(),
        );
        dispatch(getTodo(data));
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  return (
    <>
      <InputAdd />
      {/* Card Todo List */}
      <Card
        className="border-0 shadow-sm p-4"
        style={{ backgroundColor: "#F4EFE9", borderRadius: "40px" }}
      >
        <Card.Body className="p-0">
          <div className="todo-list" style={{ minHeight: "300px" }}>
            {todos.map((todo) => {
              if (todo.active) {
                return (
                  <div
                    key={todo._id}
                    className="d-flex align-items-center mb-4 group cursor-pointer"
                  >
                    <></>
                    {/* Checkbox Icon */}
                    <div
                      className="me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(todo)}
                    >
                      {todo.status === 1 ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          size="2x"
                          style={{ color: "#D1914B" }}
                        />
                      ) : todo.status === 0 ? (
                        <FontAwesomeIcon
                          icon={faCircle}
                          size="2x"
                          style={{ color: "#BCBCBC" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircle}
                          size="2x"
                          style={{ color: "#f90404ff" }}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <span
                      className="flex-grow-1 fs-5"
                      style={{
                        color: todo.status === 0 ? "#333333" : "#BCBCBC",
                        textDecoration:
                          todo.status === 1 ? "line-through" : "none",
                        fontWeight: "500",
                      }}
                      onClick={() => handleEdit(todo)}
                    >
                      {todo.title}
                    </span>

                    {/* Trash Icon */}
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{
                        color: "#e02121ff",
                        cursor: "pointer",
                        opacity: 0.6,
                      }}
                      className="trash-hover"
                      onClick={() => handleDelete(todo)}
                    />
                  </div>
                );
              }
            })}
          </div>

          {/* Clear Completed Button */}
          <div className="text-center mt-4">
            <Button
              variant="link"
              className="text-decoration-none fw-bold d-flex align-items-center justify-content-center mx-auto"
              style={{ color: "#D1914B" }}
              onClick={() => handleDeleteCompleted()}
            >
              <FontAwesomeIcon
                icon={faMobileAlt}
                className="me-2 rotate-180"
                style={{ transform: "rotate(180deg)" }}
              />
              Clear Completed
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modals
        todo={todo}
        showModal={show}
        editTitle={editTitle}
        handleClose={handleClose}
      />
    </>
  );
}
