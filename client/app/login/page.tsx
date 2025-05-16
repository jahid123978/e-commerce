"use client";
import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess, startLoading } from "../redux/store/slices/userSlice";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const dispatch = useDispatch();
  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    dispatch(startLoading());
try {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { ...form });
  const { user, token } = res.data;

  // Save to localStorage if needed
  localStorage.setItem('token', token);
  localStorage.setItem('email', user.email);
   toast.success('Login successful');
  dispatch(loginSuccess({ user, token }));
  router.push('/');
  setError('');
  setLoading(false);
} catch (err:any) {
  dispatch(loginFailure(err?.response?.data?.message || 'Login failed'));
  toast.error(err?.response?.data?.message || 'Login failed');
  setLoading(true);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Log In to Your Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
             
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
