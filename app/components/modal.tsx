"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function Modals({
  showModal,
  editTitle,
  handleClose,
}: {
  showModal: boolean;
  editTitle: string;
  handleClose: () => void;
}) {
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
              <Form.Control type="text" placeholder="ABCD......" />
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
