"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/services/auth.service";
import { setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("access_token", res.data.access_token);
      setCookie('access_token', res.data.access_token, { maxAge: 60 * 60 * 24 });
      router.push("/user-info");
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#09141A] via-[#09141A] to-[#1F4247]">
      <div className="w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-white border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="********"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-white border-gray-300 px-4 py-2
                         focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] py-2 font-semibold text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          No account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="cursor-pointer text-yellow-600 hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </main>
  );
}
