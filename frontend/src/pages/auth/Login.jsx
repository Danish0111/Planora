import React, { useState } from 'react'
import sideImage from '../../assets/authSideIllustration.png'
import logo from '../../assets/planora.png'
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const Login = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = useAuthStore();
    const validateForm = () => {
        if (!password) return toast.error("Password is required");
        if (password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) {
            const formData = {
                email,
                password,
            }
            login(formData);
        }
    };
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex flex-col justify-center items-center bg-[#f9fbfc] px-10">
                <img
                    src={sideImage}
                    alt="Project management illustration"
                    className="w-3/4 max-w-md"
                />
                <h2 className="text-3xl font-semibold mt-8 text-gray-800 text-center">
                    Stay organized. Deliver faster.
                </h2>
                <p className="text-gray-500 mt-2 text-center max-w-sm">
                    Manage tasks, collaborate with your team, and boost productivity — all in one place.
                </p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white px-8 sm:px-16">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-1">
                        <img className='size-6' src={logo} alt="" />
                        <h1 className="text-blue-600 font-bold text-xl py-8">Planora</h1>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back 👋</h2>
                    <p className="text-gray-500 mb-8">Sign in to manage your projects</p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder="example@email.com"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="flex justify-center items-center border border-gray-300 rounded-lg px-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={isEyeOpen ? 'text' : 'password'}
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full outline-none p-2"
                                    required
                                />
                                <button type='button' className='hover:cursor-pointer' onClick={() => setIsEyeOpen(!isEyeOpen)}>
                                    {
                                        isEyeOpen ? <Eye className='size-4' />
                                            : <EyeClosed className='size-4' />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <a href="#" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition duration-200"
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <Loader2 className='size-6 animate-spin' />
                                </div>
                            ) : "Login"}
                        </button>

                        <p className="text-sm text-center text-gray-500 mt-2">
                            Don’t have an account?{' '}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
