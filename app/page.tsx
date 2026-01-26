"use client";
import Login from "./components/login/page";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "./utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Nếu token còn hạn, "đá" người dùng sang trang todo ngay lập tức
    if (isTokenValid()) {
      router.push("/components/todos");
    } else {
      localStorage.clear();
      router.push("/");
    }
  }, [router]);
  return (
    <>
      <Login />
    </>
  );
}
