"use client";
import { useState, useEffect } from "react";

import { RootState } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { setRememberMe } from "../../redux/reducers/usersReducer";

export default function RememberMe() {
  const { rememberMe } = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch();

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    dispatch(setRememberMe(isChecked));

    if (!isChecked) {
      localStorage.removeItem("rememberMe");
    } else {
      localStorage.setItem("rememberMe", isChecked.toString());
    }
  };

  useEffect(() => {
    // Lấy email đã lưu từ LocalStorage
    const savedEmail = localStorage.getItem("rememberMe");
    const emailExist = localStorage.getItem("email");
    if (savedEmail && emailExist) {
      localStorage.setItem("rememberMe", rememberMe.toString());
      dispatch(setRememberMe(true));
    }
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="rememberMe"
          style={{ accentColor: "#6B2D5C" }}
          checked={rememberMe}
          onChange={(e) => handleRememberMe(e)}
        />
        <label
          className="form-check-label small text-secondary"
          htmlFor="rememberMe"
        >
          Remember Me
        </label>
      </div>
      <a
        href="#"
        className="small fw-bold text-decoration-none"
        style={{ color: "#6B2D5C" }}
      >
        Forgot Password?
      </a>
    </div>
  );
}
