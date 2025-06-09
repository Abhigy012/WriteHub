import React from "react";
// import { Link } from 'react-router-dom'
import Logo from "../Logo";

// Mock components for demonstration
const Link = ({ to, className, children, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// const Logo = ({ width }) => (
//   <div className="text-xl font-bold text-white">Your Logo</div>
// );

function Footer() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-40 -left-40 w-80 h-80 bg-blue-500/10 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-3xl"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-72 h-72 bg-indigo-500/5 blur-3xl"></div>
      </div>

      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      <div className="relative z-10 px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Copyright Section */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center group">
                <div className="p-3 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-2xl group-hover:bg-white/20">
                  <Logo width="120px" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="max-w-md text-lg leading-relaxed text-gray-300">
                  Discover amazing stories and join our community of passionate
                  writers and readers.
                </p>

                {/* Social Media Icons */}
                <div className="flex justify-center w-full gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                &copy; Copyright 2023. All Rights Reserved by DevUI.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Legals
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block text-base text-gray-300 transition-colors duration-200 hover:text-white hover:translate-x-1"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>

              {/* Newsletter Signup */}
              <div className="flex flex-col p-6 mt-8 border bg-white/5 backdrop-blur-sm rounded-2xl border-white/10">
                <h4 className="mb-3 font-semibold text-white">Stay Updated</h4>
                <p className="mb-4 text-sm text-gray-400">
                  Get the latest stories delivered to your inbox.
                </p>
                <div className="flex w-full">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 min-w-0 px-4 py-3 text-white placeholder-gray-400 border rounded-l-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="flex-shrink-0 px-5 py-3 font-medium text-white transition-all duration-200 rounded-r-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
