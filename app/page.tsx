import Link from "next/link";

export default function Home() {
  return (

    <main
      className="
      min-h-screen
      bg-gradient-to-br
      from-white via-gray-50 to-gray-100
      dark:from-zinc-900 dark:via-zinc-900 dark:to-black
      flex items-center justify-center
      px-6
      text-gray-900 dark:text-white
      "
    >

      <div className="max-w-5xl w-full text-center">

        <h1
          className="
          text-5xl md:text-6xl
          font-extrabold
          leading-tight
          "
        >
          Design Systems.
          <br />

          <span className="text-blue-500">
            Visually. Clearly. Faster.
          </span>

        </h1>


        <p
          className="
          mt-6 text-lg md:text-xl
          text-gray-600 dark:text-gray-300
          max-w-2xl mx-auto
          "
        >
          Create scalable system designs with a guided flow. Perfect for
          architects, engineers, and interview preparation.
        </p>


        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/home"
            className="
            px-8 py-4
            rounded-xl
            bg-blue-500
            text-white
            font-semibold text-lg
            shadow-lg
            hover:scale-105
            transition-transform
            "
          >
            Create System Now
          </Link>

        </div>

      </div>

    </main>

  );
}