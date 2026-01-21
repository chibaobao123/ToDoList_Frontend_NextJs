export default function GoogleLogin() {
  return (
    <>
      <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2 mb-4 rounded-3 shadow-sm border-light-subtle">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="18"
          height="18"
        />
        <span className="fw-semibold text-dark small">
          Continue with Google
        </span>
      </button>
    </>
  );
}
