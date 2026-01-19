"use client";
import { useState, useEffect } from "react";

import { RootState } from "../redux/configStore"; // Import kiểu RootState bạn đã định nghĩa
import { useSelector, useDispatch } from "react-redux";
// Import action từ file slice
import {
  ITodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../redux/reducers/todoReducer";

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
  handleUpdateTodo: (todoUpdate: ITodo) => void;
  handleDeleteTodo: (id: number) => void;
}

export interface IInputAddProps {
  addNewTodo: (newTodo: ITodo) => void;
}

export default function Todo() {
  // Lấy dữ liệu từ slice 'todos'
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState("Edited");

  const [lists, setLists] = useState<ITodo[]>(todos);

  const [todo, setTodo] = useState<ITodo>({
    id: 0,
    title: "",
    status: 0,
    active: true,
  });

  // Cập nhật local state khi store thay đổi
  useEffect(() => {
    setLists(todos);
  }, [todos]);

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

  const addNewTodo = (newTodo: ITodo) => {
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = (todoUpdate: ITodo) => {
    dispatch(updateTodo(todoUpdate));

    handleClose();
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));

    handleClose();
  };

  return (
    <>
      <InputAdd addNewTodo={addNewTodo} />
      {/* Card Todo List */}
      <Card
        className="border-0 shadow-sm p-4"
        style={{ backgroundColor: "#F4EFE9", borderRadius: "40px" }}
      >
        <Card.Body className="p-0">
          <div className="todo-list" style={{ minHeight: "300px" }}>
            {lists.map((list) => {
              if (list.active) {
                return (
                  <div
                    key={list.id}
                    className="d-flex align-items-center mb-4 group cursor-pointer"
                  >
                    <></>
                    {/* Checkbox Icon */}
                    <div
                      className="me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(list)}
                    >
                      {list.status === 1 ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          size="2x"
                          style={{ color: "#D1914B" }}
                        />
                      ) : list.status === 0 ? (
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
                        color: list.status === 0 ? "#333333" : "#BCBCBC",
                        textDecoration:
                          list.status === 1 ? "line-through" : "none",
                        fontWeight: "500",
                      }}
                      onClick={() => handleEdit(list)}
                    >
                      {list.title}
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
                      onClick={() => handleDelete(list)}
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
              onClick={() => {
                const updatedLists = lists.map((item) => ({
                  ...item,
                  active: false,
                }));
                setLists(updatedLists);
              }}
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
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
