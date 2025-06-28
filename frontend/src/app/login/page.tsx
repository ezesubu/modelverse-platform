'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { loading, error } = useAppSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await dispatch(loginUser({ username, password }));

        if (loginUser.fulfilled.match(result)) {
            localStorage.setItem('token', result.payload);
            setSuccess(true);
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Login to ModelVerse</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        ❌ {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                        ✅ Login successful!
                    </div>
                )}

                <label className="block text-sm font-medium mb-1" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />

                <label className="block text-sm font-medium mb-1" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-6 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white font-medium ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
