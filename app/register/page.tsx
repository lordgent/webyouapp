"use client";

import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center  bg-gradient-to-r from-[#09141A] via-[#09141A] to-[#1F4247] ">
      <div className="w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1 className="mb-6  text-2xl font-bold text-white">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
        Have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer text-yellow-600 hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </main>
  );
}
