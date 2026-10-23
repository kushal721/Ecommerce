import { useState } from "react";
import Icon from "./Icon";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (event) => {
    event.preventDefault();
    setStatus(EMAIL.test(email.trim()) ? "done" : "error");
  };

  if (status === "done") {
    return (
      <p className="newsletter-done">
        <Icon name="check" /> You are on the list. The first letter goes out on Friday.
      </p>
    );
  }

  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        className="input"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? "newsletter-error" : undefined}
      />
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
      {status === "error" && (
        <p id="newsletter-error" className="field-error">
          That email address looks incomplete.
        </p>
      )}
    </form>
  );
}
