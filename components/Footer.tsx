"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-24 pb-12">

      <div className="max-w-6xl mx-auto px-6">

        {/* 🔥 CONTACT / CTA CONTAINER */}
        <div className="w-full rounded-[28px] px-10 py-12 
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
        text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* LEFT */}
          <div className="max-w-md">
            <h3 className="text-3xl font-semibold mb-4 leading-tight">
              Get in touch with us
            </h3>
            <p className="text-gray-300 text-sm">
              Have questions about Sniplink? Reach out and we’ll help you
              optimize your links, tracking, and analytics workflow.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-auto">
            <p className="text-sm text-gray-300 mb-3">
              Contact us
            </p>

            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full bg-white/10 text-white placeholder:text-gray-400 outline-none border border-white/10 w-[220px]"
              />

              <button className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 transition">
                Send
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              We’ll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* 🔥 FOOTER LINKS */}
        <div className="mt-16 grid md:grid-cols-4 gap-10">

          {/* LOGO / BRAND */}
          <div>
            <div className="text-xl font-semibold text-gray-900 mb-2">
              Sniplink
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Simplify your links. Track every click. Understand your audience.
            </p>
          </div>

          {/* FEATURES */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">
              Features
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>Link Shortening</p>
              <p>Analytics</p>
              <p>QR Codes</p>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>Help Center</p>
              <p>FAQs</p>
              <p>Contact</p>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-4">
              Legal
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookies</p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}