"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {

  const [open, setOpen] = useState(false);

  return (

    <header
      className="
      sticky top-0 z-50 w-full
      border-b border-gray-200/40 dark:border-zinc-800
      bg-white/60 dark:bg-zinc-900/70
      backdrop-blur-xl
      text-gray-900 dark:text-white
      "
    >

      <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">

          <div
            className="
            flex h-9 w-9 items-center justify-center
            rounded-lg bg-blue-500 text-white
            font-bold shadow-md
            "
          >
            S
          </div>

          <span className="text-lg font-semibold tracking-tight">
            SystemFlow
          </span>

        </Link>


        {/* Desktop Nav */}
        <nav
          className="
          hidden md:flex items-center gap-8
          text-sm font-medium
          text-gray-600 dark:text-gray-300
          "
        >

          {["Product", "Templates", "Docs", "Pricing"].map((item) => (

            <Link
              key={item}
              href="/"
              className="relative group hover:text-black dark:hover:text-white"
            >

              {item}

              <span
                className="
                absolute left-0 -bottom-1 h-[2px] w-0
                bg-indigo-600
                transition-all duration-300
                group-hover:w-full
                "
              />

            </Link>

          ))}

        </nav>


        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            href="/login"
            className="
            text-sm font-medium
            text-gray-600 dark:text-gray-300
            hover:text-black dark:hover:text-white
            transition
            "
          >
            Login
          </Link>

          <Link
            href="/editor"
            className="
            rounded-lg
            bg-blue-500
            px-5 py-2
            text-sm font-medium text-white
            shadow-md
            transition
            hover:shadow-lg hover:scale-[1.02]
            "
          >
            Create Flow
          </Link>

        </div>


        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black dark:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>


      {/* Mobile Menu */}
      {open && (

        <div
          className="
          md:hidden
          border-t border-gray-200 dark:border-zinc-800
          bg-white dark:bg-zinc-900
          "
        >

          <div
            className="
            flex flex-col gap-4
            px-6 py-5 text-sm
            text-gray-700 dark:text-gray-300
            "
          >

            <Link href="/">Product</Link>
            <Link href="/">Templates</Link>
            <Link href="/">Docs</Link>
            <Link href="/">Pricing</Link>
            <Link href="/login">Login</Link>

            <Link
              href="/editor"
              className="
              mt-2 rounded-lg
              bg-gradient-to-r from-indigo-500 to-purple-600
              px-4 py-2
              text-white text-center
              "
            >
              Create Flow
            </Link>

          </div>

        </div>

      )}

    </header>

  );

}