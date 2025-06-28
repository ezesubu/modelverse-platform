'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname(); // 👈 usamos la ruta actual
    const dispatch = useAppDispatch();



    const isOnDashboard = pathname === '/' || pathname.startsWith('/dashboard');
    const isOnMyAssets = pathname.startsWith('/models3d/me');
    const isOnModelDetail = pathname.startsWith('/models3d/') && !isOnMyAssets;

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                ModelVerse
            </Link>

            <div className="flex gap-4 items-center">
                {isOnModelDetail && (
                    <>
                        <Link
                            href="/models3d/me"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            My Assets
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Dashboard
                        </Link>
                    </>
                )}


                { isOnDashboard  && (
                    <Link
                        href="/models3d/me"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        My Assets
                    </Link>
                )}

                {isOnMyAssets && (
                    <>
                        <Link href="/models3d/upload" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Upload New Model
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Dashboard
                        </Link>
                    </>

                )}
            </div>
        </nav>
    );
}
