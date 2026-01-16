"use client";
import { useState } from "react";
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

// Interface for major data
export interface ITodo {
  id: number;
  title: string;
  status: number;
  active: boolean;
}

// Interface represents all the Props of the Component
export interface IModalProps {
  todo: ITodo;
  showModal: boolean;
  editTitle: string;
  handleClose: () => void;
  handleUpdateTodo: (todoUpdate: ITodo) => void;
}

export interface IInputAddProps {
  addTodo: (newTodo: ITodo) => void;
}

export default function Todo() {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState("Edited");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (list: ITodo) => {
    setEditTitle("Edited");
    handleShow();

    // console.log(list);
    setTodo(list);
  };

  const [lists, setLists] = useState([
    { id: 1, title: "go to gym", status: 0, active: true },
    { id: 2, title: "play badminton", status: 2, active: true },
    { id: 3, title: "coffee time", status: 1, active: true },
  ]);

  const [todo, setTodo] = useState<ITodo>({
    id: 0,
    title: "",
    status: 0,
    active: true,
  });

  const addTodo = (newTodo: ITodo) => {
    newTodo.id = lists.length + 1;
    setLists([...lists, newTodo]);
  };

  const handleUpdateTodo = (todoUpdate: ITodo) => {
    console.log("Updating Todo:", todoUpdate);
    const updatedLists = [...lists]; // Copy mảng gốc
    const index = updatedLists.findIndex((item) => item.id === todoUpdate.id);

    if (index !== -1) {
      updatedLists[index] = todoUpdate;
      setLists(updatedLists);
    }

    handleClose();
  };

  const handleDeleteTodo = (id: number) => {
    const updatedLists = lists.map((item) => {
      if (item.id === id) {
        return { ...item, active: false };
      }
      return item;
    });

    setLists(updatedLists);

    handleClose();
  };

  return (
    <>
      <InputAdd addTodo={addTodo} />
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
                        color: "#E6B9B9",
                        cursor: "pointer",
                        opacity: 0.6,
                      }}
                      className="trash-hover"
                      onClick={() => handleDeleteTodo(list.id)}
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
      />
    </>
  );
}
