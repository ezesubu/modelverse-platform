'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getModelById, deleteModel } from '@/services/models3d.service';
import { getUserIdFromToken } from '@/lib/auth';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import ModelViewer from '@/components/ModelViewer';

export default function ModelDetailPage() {
    useAuthGuard();
    const { id } = useParams();
    const router = useRouter();

    const [model, setModel] = useState<any>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setUserId(getUserIdFromToken());

        const fetchModel = async () => {
            try {
                const data = await getModelById(id as string);
                setModel(data);
            } catch (err) {
                console.error('Error fetching model:', err);
                setError('Failed to load model.');
            } finally {
                setLoading(false);
            }
        };

        fetchModel();
    }, [id]);

    if (loading) return <p className="text-center mt-6">Loading...</p>;
    if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;
    if (!model) return <p className="text-center mt-6 text-red-600">Model not found.</p>;

    const isOwner = model.user?.id === userId;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{model.name}</h1>
            {model.format === 'fbx' || model.format === 'glb' || model.format === 'gltf' ? (
                <ModelViewer
                    url={model.url}
                    format={model.format}
                />
            ) : (
                <img
                    src={model.previewImage}
                    alt={model.name}
                    className="w-full h-96 object-cover rounded shadow mb-6"
                />
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Description:</strong> {model.description}</p>
                <p><strong>Format:</strong> {model.format}</p>
                <p><strong>Tags:</strong> {model.tags}</p>
                <p><strong>License:</strong> {model.license}</p>
                <p><strong>Price:</strong> ${model.price} {model.currency}</p>
                <p><strong>Rating:</strong> ⭐ {model.rating} ({model.reviewCount} reviews)</p>
                <p><strong>Refundable:</strong> {model.refundable ? 'Yes' : 'No'}</p>
                <p><strong>Uploaded:</strong> {new Date(model.uploadedAt).toLocaleString()}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
                <a
                    href={`http://localhost:3001${model.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    ⬇️ Download Model
                </a>

                {isOwner && (
                    <>
                        <button
                            onClick={() => router.push(`/models3d/${model.id}/edit`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this model?')) {
                                    await deleteModel(model.id);
                                    router.push('/models3d/me');
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            🗑️ Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
