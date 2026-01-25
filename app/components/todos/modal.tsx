"use client";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { IModalProps } from "./todo";

import { RootState } from "../../redux/configStore"; // Import kiểu RootState bạn đã định nghĩa
import { useSelector, useDispatch } from "react-redux";
// Import action từ file slice
import { deleteTodo, updateTodo } from "../../redux/reducers/todoReducer";
import { ITodo } from "../../interfaces/todo.interface";

export default function Modals(props: IModalProps) {
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const { todo, showModal, editTitle, handleClose } = props;

  const [todoUpdate, setTodoUpdate] = useState<ITodo>(todo);

  useEffect(() => {
    // Mỗi khi props.todo thay đổi (khi bạn bấm nút Edit khác),
    // hãy cập nhật lại state nội bộ của Modal
    setTodoUpdate(todo);
  }, [todo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    // console.log("Changing:", name, value);
    setTodoUpdate({
      ...todoUpdate,
      [name]: name === "status" ? Number(value) : value,
    });
  };

  const handleUpdateTodo = async () => {
    if (todoUpdate.title.trim() === "" || todoUpdate.status === undefined)
      return;

    try {
      // 1. Gửi request POST lên NestJS (Cổng 3001)
      const response = await fetch("http://localhost:3001/todo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoUpdate),
      });

      if (response.ok) {
        const savedTodo = await response.json();
        dispatch(updateTodo(savedTodo)); // Cập nhật vào Redux Store
      }
    } catch (error) {
      console.error("Lỗi khi update Todo:", error);
    }

    handleClose();
  };

  const handleDeleteTodo = async (_id: string) => {
    try {
      // Gửi request DELETE kèm theo _id
      const response = await fetch(`http://localhost:3001/todo/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Sau khi DB xóa xong, gọi dispatch để xóa nốt trên giao diện
        dispatch(deleteTodo(_id));
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }

    handleClose();
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        {editTitle === "Edited" ? (
          <Modal.Title>New to do</Modal.Title>
        ) : (
          <Modal.Title>Delete</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {editTitle === "Edited" ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={todo.title}
                onChange={handleChange}
              />
              <Form.Label>Status</Form.Label>
              <Form.Select
                defaultValue={todo.status}
                name="status"
                onChange={handleChange}
              >
                <option value="0">Processing</option>
                <option value="1">Completed</option>
                <option value="2">Cancel</option>
              </Form.Select>
            </Form.Group>
          </Form>
        ) : (
          <Alert key="danger" variant="danger">
            Confirm to delete?
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {editTitle === "Edited" ? (
          <Button variant="primary" onClick={() => handleUpdateTodo()}>
            Save Changes
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => handleDeleteTodo(todo._id!)}
          >
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
