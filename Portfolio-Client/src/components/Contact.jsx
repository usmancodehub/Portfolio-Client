import React, { useState } from "react";
import API from "../api/axios";
import { useData } from "../context/DataContext";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  useScrollReveal();
  const { about } = useData();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");
    try {
      const { data } = await API.post("/contact", form);
      setStatus(data.message || "Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title reveal">
          Get In <span>Touch</span>
        </h2>
        <p className="section-subtitle reveal">
          Have a project or opportunity? Let's connect.
        </p>

        <div className="contact-grid">
          <div className="contact-card reveal">
            <h3>{about?.contactTitle || "Let's Work Together"}</h3>
            <p style={{ whiteSpace: "pre-line" }}>
              {about?.contactDescription ||
                "I'm open to internships, collaborations, and exciting development opportunities. Feel free to contact me."}
            </p>

            <div className="contact-info">
              <div>
                <strong>✉ Email</strong>
                <p>{about?.email || "mern@example.com"}</p>
              </div>

              <div>
                <strong>⌖ Location</strong>
                <p style={{ whiteSpace: "pre-line" }}>
                  {about?.contactLocation ||
                    about?.location ||
                    "Pakistan — Open to Remote Work"}
                </p>
              </div>

              <div>
                <strong>▣ Availability</strong>
                <p style={{ whiteSpace: "pre-line" }}>
                  {about?.availability || "Open to Internship"}
                </p>
              </div>
            </div>
          </div>

          <div className="contact-card reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
              <p className="form-message">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}