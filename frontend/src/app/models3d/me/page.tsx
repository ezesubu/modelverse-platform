'use client';

import { useEffect, useState } from 'react';
import { getMyModels } from '@/services/models3d.service';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import {logout} from "@/store/authSlice";
import {useRouter} from "next/navigation";
import { useAppDispatch } from '@/store/hooks';
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function MyModelsPage() {

    useAuthGuard();

    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useUser();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        router.push('/login');
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await getMyModels();
                setModels(data);
            } catch (err) {
                console.error('Error loading your models:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-1 bg-white p-4 rounded shadow h-fit">
                <h2 className="text-xl font-bold mb-2">👤 Profile</h2>
                {user ? (
                    <>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Models:</strong> {models.length}</p>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>

                ) : (
                    <p className="text-sm text-gray-500">No user info</p>
                )}
            </aside>

            {/* Models */}
            <div className="md:col-span-3">
                <h1 className="text-2xl font-bold mb-6">My 3D Models</h1>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : models.length === 0 ? (
                    <p className="text-gray-500">You haven’t uploaded any models yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {models.map((model: any) => (
                            <Link href={`/models3d/${model.id}`}>
                                <div key={model.id} className="border p-4 rounded shadow">
                                    <img
                                        src={model.previewImage}
                                        alt={model.name}
                                        className="w-full h-40 object-cover mb-2 rounded"
                                    />
                                    <h3 className="font-semibold text-lg">{model.name}</h3>
                                    <p className="text-sm text-gray-500">{model.author}</p>
                                    <p className="text-blue-600 font-medium mt-1">${model.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
