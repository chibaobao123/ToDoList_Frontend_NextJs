import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { useState, useEffect } from "react";

import { RootState } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../../redux/reducers/usersReducer";

export default function NavbarTodo() {
  const users = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) dispatch(setLoginUser(email));
  }, []);
  return (
    <>
      <Navbar className="" style={{ backgroundColor: "#e6ceb5ff" }}>
        <Container>
          <Navbar.Brand href="#">Todo Application</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{users.loginUser}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
