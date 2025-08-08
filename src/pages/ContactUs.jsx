import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xvgqvebp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-indigo-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-cyan-400">
          Contact Us
        </h1>
        <p className="text-gray-200 mb-3 text-lg">
          Need help, feedback, or want to chat about partnerships? Drop us a
          line. We reply human-to-human (no robo-responses unless you pay
          extra).
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-white text-lg">Support</h3>
              <p className="text-blue-200 text-sm">support@kaamkaro.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg">Business</h3>
              <p className="text-blue-200 text-sm">business@kaamkaro.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg">Phone</h3>
              <p className="text-blue-200 text-sm">9876543210</p>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg">Location</h3>
              <p className="text-blue-200 text-sm">
                123 Tech Street, Delhi, India
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-blue-200 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  LinkedIn
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/70 p-4 rounded-lg border border-blue-500/30 flex-1"
          >
            <label className="block mb-2">
              <span className="text-sm text-gray-300">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm text-gray-300">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-sm text-gray-300">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                required
                className="mt-1 w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold transition disabled:opacity-50"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              <span className="text-sm text-gray-300 ml-1">
                {status === "sent"
                  ? "Thanks, we’ll contact you ASAP!"
                  : status === "error"
                  ? "Error occurred."
                  : ""}
              </span>
            </div>
          </form>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-white text-lg">Our Location</h3>
          <noscript>
            <div className="bg-gray-700/50 p-4 rounded-lg mt-2">
              Google Maps
              <br />
              When you have eliminated the JavaScript, whatever remains must be
              an empty page.
              <br />
              Enable JavaScript to see Google Maps.
            </div>
          </noscript>
          <iframe
            title="Google Maps - Delhi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448183.7391315674!2d76.81307277358503!3d28.64667725567126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b027c8b91%3A0x6f8cb3c5b3b6f0bb!2sDelhi!5e0!3m2!1sen!2sin!4v1691400000000!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
