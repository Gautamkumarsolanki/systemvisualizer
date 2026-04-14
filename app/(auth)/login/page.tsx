// "use client"

// import { signIn } from "next-auth/react"
 
// export default function SignIn() {
//   return <button onClick={() => signIn("google", { callbackUrl: "/home" })}>Sign in with Google</button>
// }

"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg mb-4 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/home" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-2 rounded-lg mb-6 hover:bg-gray-800 transition"
        >
          <FaGithub size={20} />
          Sign in with GitHub
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account? <span className="text-blue-600 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  )
}
