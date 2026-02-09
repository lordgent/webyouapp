"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/services/auth.service";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Password dan confirm password tidak sama");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.username,
        email: form.email,
        password: form.password,
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#09141A] via-[#09141A] to-[#1F4247]">
      <div className="w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
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
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 text-white px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 text-white px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 text-white px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border text-white border-gray-300 px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] py-2 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
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
