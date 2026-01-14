"use client";
import Todo from "./components/todo";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Ngăn Font Awesome tự thêm CSS vì đã import ở trên

export default function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <table className="table border table-bordered shadow text-center">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-6">Title</th>
            <th className="col-2">Status</th>
            <th className="col-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <Todo />
        </tbody>
      </table>
    </div>
  );
}
