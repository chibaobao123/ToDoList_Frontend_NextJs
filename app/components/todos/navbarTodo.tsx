import Container from "react-bootstrap/Container";
import { Navbar, NavDropdown, Dropdown } from "react-bootstrap/";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { RootState } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../../redux/reducers/usersReducer";

export default function NavbarTodo() {
  const { loginUser, rememberMe } = useSelector(
    (state: RootState) => state.usersReducer,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    if (!rememberMe) localStorage.removeItem("email");
    router.push("/");
  };

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
            <NavDropdown
              title={<span>{loginUser || "email@gmail.com"}</span>}
              id="nav-dropdown-user"
              className="custom-dropdown"
            >
              <Dropdown.Item
                onClick={() => router.push("./components/profileUser")}
              >
                Thông tin người dùng
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item
                onClick={() => handleLogout()}
                className="text-danger"
              >
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
