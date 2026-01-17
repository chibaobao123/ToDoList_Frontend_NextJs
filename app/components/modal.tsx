"use client";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { IModalProps } from "./todo";

export default function Modals(props: IModalProps) {
  const { todo, showModal, editTitle, handleClose, handleUpdateTodo, handleDeleteTodo } = props;

  const [todoUpdate, setTodoUpdate] = useState(todo);

  useEffect(() => {
    // Mỗi khi props.todo thay đổi (khi bạn bấm nút Edit khác),
    // hãy cập nhật lại state nội bộ của Modal
    setTodoUpdate(todo);
  }, [todo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // console.log("Changing:", name, value);
    setTodoUpdate({
      ...todoUpdate,
      [name]: name === "status" ? Number(value) : value,
    });
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
          <Button
            variant="primary"
            onClick={() => handleUpdateTodo(todoUpdate)}
          >
            Save Changes
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => handleDeleteTodo(todo.id)}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
