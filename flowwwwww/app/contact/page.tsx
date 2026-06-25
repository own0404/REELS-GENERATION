"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/products";
import { BRAND } from "@/lib/constants";
import { Phone, MapPin, Clock, ChatCircle } from "@phosphor-icons/react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const waLink = `https://wa.me/${BRAND.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(BRAND.whatsappMessage)}`;

const PRODUCT_OPTIONS = [
  { value: "", label: "Select a product..." },
  ...products.map((p) => ({ value: p.id, label: `${p.name} (${p.category})` })),
  { value: "not-sure", label: "Not sure / General inquiry" },
];

interface FormState {
  name: string;
  phone: string;
  city: string;
  productInterest: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    city: "",
    productInterest: "",
    message: "",
  });
  const [csrfToken, setCsrfToken] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/csrf-token", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrf_token))
      .catch(() => {});

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "RECAPTCHA_SITE_KEY_PLACEHOLDER";
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha.execute(siteKey, { action: "submit" }).then(setRecaptchaToken);
      });
    };
    document.head.appendChild(script);
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.name.trim() && form.phone.trim().length >= 10 && form.city.trim() && form.productInterest;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken, "X-Recaptcha-Token": recaptchaToken },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          product_interest: form.productInterest,
          message: form.message.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", phone: "", city: "", productInterest: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error. Please try again.");
    }
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 lg:py-10 max-w-lg mx-auto lg:max-w-7xl">
      {/* Header */}
      <RevealSection>
        <div className="mb-6 lg:mb-8">
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            Get In Touch
          </p>
          <h1 className="font-display font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Tell Us About<br />
            <span className="text-primary">Your Water.</span>
          </h1>
          <p className="text-charcoal/60 text-sm mt-2 leading-relaxed lg:max-w-xl speakable">
            We serve customers all over India. Fill in your details and we&apos;ll get back to you within minutes &mdash; no obligation, no pressure.
          </p>
        </div>
      </RevealSection>

      {/* Desktop: two-column layout */}
      <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-10 lg:items-start">

        {/* Left: Form */}
        <RevealSection>
          <div>
            {status === "success" ? (
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 text-center mb-6">
                <div className="text-4xl mb-3">✅</div>
                <h2 className="font-display font-bold text-charcoal text-lg mb-1">Thank You!</h2>
                <p className="text-charcoal/60 text-sm mb-4 leading-relaxed">
                  We&apos;ve received your inquiry. Our team will reach out to you on WhatsApp within minutes.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta btn-cta--whatsapp"
                  >
                    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat with Us Now
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-charcoal/60 text-xs font-medium hover:text-charcoal transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-5 mb-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {/* Name */}
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="text-charcoal text-xs font-bold mb-1.5 block">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. Venkatesh Rao"
                      required
                      className="w-full px-3.5 py-3 rounded-xl border border-secondary bg-white text-charcoal text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="text-charcoal text-xs font-bold mb-1.5 block">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full px-3.5 py-3 rounded-xl border border-secondary bg-white text-charcoal text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  {/* City */}
                  <div className="sm:col-span-1">
                    <label htmlFor="city" className="text-charcoal text-xs font-bold mb-1.5 block">
                      City / Area <span className="text-primary">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="e.g. Kukatpally, Hyderabad"
                      required
                      className="w-full px-3.5 py-3 rounded-xl border border-secondary bg-white text-charcoal text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  {/* Product dropdown */}
                  <div className="sm:col-span-1">
                    <label htmlFor="product" className="text-charcoal text-xs font-bold mb-1.5 block">
                      Product Interested In <span className="text-primary">*</span>
                    </label>
                    <select
                      id="product"
                      value={form.productInterest}
                      onChange={(e) => update("productInterest", e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl border border-secondary bg-white text-charcoal text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23069494%22%3E%3Cpath%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.17l3.71-3.94a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200L5.21%208.27a.75.75%200%2001.02-1.06z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10"
                    >
                      {PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-charcoal text-xs font-bold mb-1.5 block">
                      Message <span className="text-charcoal/40">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your water problem or any questions..."
                      className="w-full px-3.5 py-3 rounded-xl border border-secondary bg-white text-charcoal text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="sm:col-span-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <p className="text-red-700 text-xs">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={!isValid || status === "loading"}
                      className={`btn-cta ${
                        !isValid || status === "loading"
                          ? "btn-cta--disabled"
                          : "btn-cta--primary"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-charcoal/30 border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </RevealSection>

        {/* Right: Contact info + WhatsApp */}
        <RevealSection>
          <div className="space-y-4">
            {/* WhatsApp CTA */}
            <div className="bg-primary rounded-2xl p-5">
              <div className="w-10 h-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center mb-3">
                <ChatCircle size={20} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Prefer WhatsApp?</h3>
              <p className="text-white/85 text-xs mb-4 leading-relaxed">
                Skip the form. Chat directly with our experts and get answers in minutes.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta--whatsapp"
              >
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact details */}
            <div className="card p-4">
              <h3 className="font-display font-bold text-charcoal text-sm mb-3">Or Reach Us Directly</h3>
              <div className="grid gap-3">
                <a
                  href={`tel:${BRAND.whatsappNumber}`}
                  className="flex items-center gap-3 text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium">{BRAND.whatsappNumber}</span>
                </a>
                <div className="flex items-start gap-3 text-charcoal/60">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="text-xs leading-relaxed">{BRAND.address}</span>
                </div>
                <div className="flex items-center gap-3 text-charcoal/60">
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={14} className="text-primary" />
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-charcoal">Mon &ndash; Sun</span>
                    <br />
                    <span className="text-charcoal/50">9:00 AM &ndash; 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-secondary rounded-2xl p-4">
              <p className="text-charcoal/50 text-[10px] font-bold uppercase tracking-wider mb-3">Why Choose Us</p>
              <div className="space-y-2">
                {[
                  "Free water test — no obligation",
                  "Response within minutes on WhatsApp",
                  "Installation in under 2 hours",
                  "5-year warranty on all products",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-[10px] font-bold">✓</span>
                    </span>
                    <span className="text-charcoal/70 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}
