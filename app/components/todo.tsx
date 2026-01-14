"use client";
import { useState } from "react";
import Modals from "./modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

export default function Todo() {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState("Edited");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    setEditTitle("Edited");
    handleShow();
  };

  const handleDelete = () => {
    setEditTitle("Deleted");
    handleShow();
  };

  return (
    <>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>process</td>
        <td>
          <button
            onClick={handleEdit}
            type="button"
            className="btn btn-primary mx-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-danger mx-2"
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
        </td>
      </tr>
      <Modals
        showModal={show}
        editTitle={editTitle}
        handleClose={handleClose}
      />
    </>
  );
}
