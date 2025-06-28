'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateModel } from '@/services/models3d.service';



export default function EditModelForm({ model }: { model: any }) {
    const router = useRouter();
    const [fields, setFields] = useState({ ...model });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFields(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await updateModel(model.id, fields);
            router.push(`/models3d/${model.id}`);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Edit Model</h2>

            <input name="name" value={fields.name} onChange={handleChange} placeholder="Name" className="input" required />
            <textarea name="description" value={fields.description} onChange={handleChange} placeholder="Description" className="input" />
            <input name="tags" value={fields.tags} onChange={handleChange} placeholder="Tags" className="input" />
            <input name="license" value={fields.license} onChange={handleChange} placeholder="License" className="input" />
            <input name="previewImage" value={fields.previewImage} onChange={handleChange} placeholder="Preview Image URL" className="input" />
            <input name="videoUrl" value={fields.videoUrl} onChange={handleChange} placeholder="Video URL" className="input" />
            <input name="price" type="number" value={fields.price} onChange={handleChange} placeholder="Price" className="input" />
            <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="refundable" checked={fields.refundable} onChange={handleChange} />
                Refundable
            </label>

            {error && <p className="text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
}
