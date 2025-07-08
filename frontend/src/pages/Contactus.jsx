import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-72 flex flex-col justify-center items-center bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,81,166,0.81),rgba(38,81,166,0.81)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-lg text-blue-100 max-w-xl text-center">
          Have questions or need help? Reach out and our team will get back to you soon!
        </p>
      </div>

      {/* Contact Form Section */}
      <section className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
            Get in Touch
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded mx-auto mb-8" />
          {submitted && (
            <div className="mb-6 text-green-600 bg-green-50 border border-green-200 rounded px-4 py-2 text-center font-semibold">
              Thank you for contacting us! We’ll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
          {/* Contact Info */}
          <div className="mt-10 text-center text-gray-500">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="mb-4 flex flex-col items-center ">
                <span className="font-semibold text-blue-600">Email:</span>{" "}
                support@housify.com
              </div>
              <div className="mb-4 flex flex-col items-center ">
                <span className="font-semibold text-blue-600">Phone:</span>{" "}
                +91 98765 43210
              </div>
              <div className="mb-4 flex flex-col items-center ">
                <span className="font-semibold text-blue-600">Address:</span>{" "}
                123 Dream Street, Mumbai, India
              </div>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}