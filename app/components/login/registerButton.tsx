"use client";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();
  return (
    <>
      <p className="text-center mt-5 text-secondary small">
        Not Registered Yet?{" "}
        <a
          className="fw-bold text-decoration-none"
          style={{ color: "#6B2D5C" }}
          onClick={() => router.push("/components/register")}
        >
          Create an account
        </a>
      </p>
    </>
  );
}
