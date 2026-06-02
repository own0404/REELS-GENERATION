"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function QuoteForm() {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    pickupLocation: "",
    dropLocation: "",
    goodsType: "",
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
        body: JSON.stringify({ ...formData, formType: "quote" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ fullName: "", phone: "", email: "", pickupLocation: "", dropLocation: "", goodsType: "", message: "" });
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
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B2A4A 0%, #0d1b33 100%)",
      }}
    >
      {/* Truck silhouette watermark */}
      <div className="absolute right-0 bottom-0 text-white/5 text-[300px] leading-none select-none pointer-events-none hidden lg:block">
        🚛
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm">Quick Enquiry</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Get a Free Quote
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mt-4 rounded-full" />
          <p className="text-gray-300 mt-4 text-sm">
            Fill in the details below and we&apos;ll get back to you within 30 minutes
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`bg-white rounded-2xl p-8 md:p-10 shadow-2xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass("fullName")}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
              <select
                name="goodsType"
                value={formData.goodsType}
                onChange={handleChange}
                className={inputClass("goodsType")}
              >
                <option value="">Type of Goods</option>
                <option value="Commercial">Commercial</option>
                <option value="Container">Container</option>
                <option value="Heavy Goods">Heavy Goods</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Industrial">Industrial</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="pickupLocation"
                placeholder="Pickup Location"
                value={formData.pickupLocation}
                onChange={handleChange}
                className={inputClass("pickupLocation")}
              />
            </div>
            <div>
              <input
                type="text"
                name="dropLocation"
                placeholder="Drop Location"
                value={formData.dropLocation}
                onChange={handleChange}
                className={inputClass("dropLocation")}
              />
            </div>
          </div>
          <div className="mt-5">
            <textarea
              name="message"
              placeholder="Your Message (Optional)"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={inputClass("message")}
            />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-brand-red text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-red-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting..." : "Request Quote"}
            </button>
            {status === "success" && (
              <p className="text-success font-semibold text-sm">
                ✅ Quote request submitted successfully! We&apos;ll contact you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-semibold text-sm">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
