"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">

      {/* Left Branding Section */}
      <div className="hidden lg:flex w-1/2 text-white flex-col justify-center px-16">
        <img
          src="/assets/workflow.jpg"
          alt="Login Illustration"
        />
      </div>

      {/* Right Signup Form */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-semibold">SystemFlow</span>
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            Create your account
          </h2>

          <p className="text-gray-500 mb-8">
            Start building system design flows today
          </p>

          {/* Signup Form */}
          <form className="space-y-5">

            <div>
              <label className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              className="w-full rounded-lg bg-blue-500 text-white py-2 font-medium hover:opacity-90 transition"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-medium"
            >
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}