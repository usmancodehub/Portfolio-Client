import React, { useState } from "react";
// 1. Import the Web3Forms hook and react-hook-form
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function Contact() {
  // 2. Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // 3. State for user feedback messages
  const [status, setStatus] = useState("");

  // 4. Define your Access Key
  // Replace this string with the key you copied from Web3Forms
  const accessKey = "6ceaea0d-b45b-419e-85c9-7ececc4d177a";

  // 5. Initialize the Web3Forms hook
  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "Usman Official Portfolio", // Name shown in your inbox
      subject: "New Contact Message from Portfolio", // Email subject
    },
    onSuccess: (msg, data) => {
      // Runs when the email is sent successfully
      setStatus("Message sent successfully! I'll get back to you soon.");
      reset(); // Clear the form fields
    },
    onError: (msg, data) => {
      // Runs if something goes wrong
      setStatus("Something went wrong. Please try again later.");
      console.error("Web3Forms Error:", msg);
    },
  });

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project or opportunity? Let's connect.
        </p>

        <div className="contact-grid">
          {/* Contact Info Card (Left Side) - Keep as is */}
          <div className="contact-card">
            <h3>Let's Work Together</h3>
            <p>
              I'm open to internships, collaborations, and exciting development
              opportunities.
            </p>
            {/* ... your contact info divs ... */}
          </div>

          {/* Contact Form Card (Right Side) */}
          <div className="contact-card">
            {/* 6. Attach onSubmit to the form's handleSubmit */}
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { required: true })}
                  required
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                {...register("subject", { required: true })}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                {...register("message", { required: true })}
                required
              ></textarea>

              {/* Optional: Hidden honeypot field for spam protection */}
              <input
                type="checkbox"
                id="botcheck"
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}
              ></input>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>

              {/* Show success/error message */}
              <p className="form-message">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}