"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { IModalProps } from "./todo";

export default function Modals(props: IModalProps) {
  const { todo, showModal, editTitle, handleClose } = props;
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
              <Form.Control type="text" defaultValue={todo.title} />
              <Form.Label>Status</Form.Label>
              <Form.Select defaultValue={todo.status}>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleClose}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
