'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { SignInRequest } from "@/types/request/SignInRequest"; 
import Link from "next/link";
import { authentication } from "@/api/auth/routes";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInRequest>({
    email: '',
    password: '',
    device: 'web-app'
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await authentication(formData); 
      if (result.code === 200) {
        localStorage.setItem("accessToken", result.data.accessToken);
        router.push("/"); 
      }
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Forgot your password?
          </Link>
        </div>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
