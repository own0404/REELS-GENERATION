/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com/recaptcha/ https://recaptcha.google.com www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/",
              "img-src 'self' data: blob:",
              "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com",
              "connect-src 'self' https://wa.me",
              "form-action 'self'",
              "frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com www.gstatic.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
