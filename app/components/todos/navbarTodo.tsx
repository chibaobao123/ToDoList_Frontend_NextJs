import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { useState, useEffect } from "react";

export default function NavbarTodo() {
  const currentUser = localStorage.getItem("email") || "";

  const [email, setEmail] = useState(currentUser);

  useEffect(() => {
    setEmail(currentUser);
  }, [currentUser]);
  return (
    <>
      <Navbar className="" style={{ backgroundColor: "#e6ceb5ff" }}>
        <Container>
          <Navbar.Brand href="#">Todo Application</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{email}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
