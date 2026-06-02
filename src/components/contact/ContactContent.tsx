"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Name is required";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone.trim())) errs.phone = "Invalid phone number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? "border-red-500" : "border-gray-200"
    } focus:outline-none focus:ring-2 focus:ring-gold text-sm`;

  return (
    <>
      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <span className="text-gold font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
              <h2 className="text-3xl font-bold text-navy mt-2 mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4 p-5 bg-light-gray rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">Our Address</h3>
                    <p className="text-sm text-dark-gray">{COMPANY.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-light-gray rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">Phone</h3>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-sm text-dark-gray hover:text-brand-red transition-colors"
                    >
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-light-gray rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-whatsapp rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-dark-gray hover:text-whatsapp transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-light-gray rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">Email</h3>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm text-dark-gray hover:text-brand-red transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-light-gray rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-secondary-blue rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    🕐
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">Business Hours</h3>
                    <p className="text-sm text-dark-gray">
                      Monday - Saturday: {COMPANY.hours.weekday}
                    </p>
                    <p className="text-sm text-dark-gray">
                      Sunday: {COMPANY.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8">
                <h3 className="font-bold text-navy mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { label: "WhatsApp", icon: "💬", color: "bg-whatsapp" },
                    { label: "Facebook", icon: "f", color: "bg-blue-600" },
                    { label: "Instagram", icon: "📷", color: "bg-pink-500" },
                    { label: "LinkedIn", icon: "in", color: "bg-blue-700" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white text-sm font-bold hover:opacity-80 transition-opacity`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-light-gray rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-navy mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass("fullName")}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass("subject")}
                  >
                    <option value="">Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Quote Request">Quote Request</option>
                    <option value="Service Inquiry">Service Inquiry</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass("message")}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-red text-white py-3.5 rounded-lg font-bold text-base hover:bg-red-700 transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && (
                  <p className="text-success font-semibold text-sm text-center">
                    ✅ Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 font-semibold text-sm text-center">
                    ❌ Failed to send message. Please try again or call us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy">Find Us on the Map</h2>
            <p className="text-sm text-gray-500 mt-2">Simhagiri Colony, Gajuwaka, Visakhapatnam-530026</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.6!2d83.21!3d17.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20395498b86!2sGajuwaka%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Murali Krishna Transport Location"
            />
          </div>
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/dir//Gajuwaka,+Visakhapatnam,+Andhra+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-secondary-blue transition-all"
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
