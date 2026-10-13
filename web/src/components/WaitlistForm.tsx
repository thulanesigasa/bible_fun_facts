"use client";
import { useState, type FormEvent } from "react";
export function WaitlistForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(
          result.error || "We could not save your request. Please try again.",
        );
      setState("success");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We could not confirm your request. Please try again; duplicate entries are prevented.",
      );
    }
  }
  return (
    <form
      className="waitlist-form"
      onSubmit={submit}
      aria-busy={state === "loading"}
    >
      <h3>Your next chapter starts here.</h3>
      <p>Leave your email for launch notifications.</p>
      <label htmlFor="waitlist-email">Email address</label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        maxLength={254}
        required
        aria-describedby="waitlist-message"
        disabled={state === "loading"}
      />
      <div className="waitlist-honeypot" aria-hidden="true">
        <label htmlFor="waitlist-website">Leave this field empty</label>
        <input
          id="waitlist-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="waitlist-consent">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={state === "loading"}
        />
        <span>
          I agree to receive exégeomai launch notifications by email. I can
          unsubscribe at any time.
        </span>
      </label>
      <button
        className="launch-button gold"
        type="submit"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Saving your request…" : "Join the Waiting List"}
        <span aria-hidden="true">↗</span>
      </button>
      <p
        id="waitlist-message"
        className={`waitlist-message ${state}`}
        role={state === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </p>
      <p className="waitlist-fineprint">
        Your email stays private. Read our{" "}
        <a href="/waitlist-privacy">waitlist privacy notice</a>. To leave,{" "}
        <a href="mailto:joinus@exegeomai.co.za?subject=Unsubscribe%20from%20waitlist">
          email us
        </a>{" "}
        from your registered address.
      </p>
    </form>
  );
}
