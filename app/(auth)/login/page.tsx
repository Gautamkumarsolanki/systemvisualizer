"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  async function onSubmit(e: any){
    e.preventDefault();
    console.log("sdfsfd");
    await signIn("credentials",{
      email:'',
      password:'',
      redirect:false,
      callbackUrl:'/home'
    })
    console.log("here");
  }
  return (
    <div className="min-h-screen flex">

      {/* Left Section (Brand / Product Info) */}
      <div className="hidden lg:flex w-1/2 text-white flex-col justify-center px-16">
        <img
          src="/assets/workflow.jpg"
          alt="Login Illustration"
        />
      </div>

      {/* Right Section (Login Form) */}
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
            Welcome back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue building system design flows
          </p>

          {/* Form */}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button onClick={onSubmit}
              className="w-full rounded-lg bg-blue-500 text-white py-2 font-medium hover:opacity-90 transition"
            >
              Sign In
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

         

        </div>

      </div>
    </div>
  );
}