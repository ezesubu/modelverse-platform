'use client';

import { useState } from 'react';
import { uploadModel } from '@/services/models3d.service';
import { useRouter } from 'next/navigation';

export default function UploadForm() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [fields, setFields] = useState({
        name: '',
        description: '',
        format: '',
        sizeMB: '',
        tags: '',
        license: '',
        previewImage: '',
        videoUrl: '',
        price: '',
        currency: 'USD',
        refundable: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value;
        setFields(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) return setError('You must select a 3D model file.');
        if (!fields.name || !fields.format || !fields.sizeMB || !fields.price) {
            return setError('Please fill in all required fields.');
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        for (const key in fields) {
            formData.append(key, fields[key as keyof typeof fields]);
        }

        try {
            await uploadModel(formData);
            router.push('/models3d/me');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploaded = e.target.files?.[0] || null;
        setFile(uploaded);

        if (uploaded) {
            const extension = uploaded.name.split('.').pop()?.toLowerCase() || '';
            const sizeInMB = (uploaded.size / (1024 * 1024)).toFixed(2); // 2 decimales

            setFields(prev => ({
                ...prev,
                format: extension,
                sizeMB: sizeInMB,
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Upload 3D Model</h2>

            {/* File Upload */}
            <div>
                <label className="block font-semibold">3D Model File (.fbx, .gltf, .glb)*</label>
                <input
                    type="file"
                    accept=".fbx,.gltf,.glb"
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded"
                    required
                />
                {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label>Name*</label>
                    <input name="name" value={fields.name} onChange={handleChange} required className="input" />
                </div>
                <div>
                    <label>Format (auto-detected)</label>
                    <input
                        name="format"
                        value={fields.format}
                        readOnly
                        className="input bg-gray-100 cursor-not-allowed text-gray-500"
                    />
                </div>
                <div>
                    <label>Size (MB)</label>
                    <input
                        name="sizeMB"
                        value={fields.sizeMB}
                        readOnly
                        className="input bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label>Price*</label>
                    <input name="price" type="number" min="0" value={fields.price} onChange={handleChange} required className="input" />
                </div>
                <div>
                    <label>Currency</label>
                    <input name="currency" value={fields.currency} onChange={handleChange} className="input" />
                </div>
                <div>
                    <label>Tags</label>
                    <input name="tags" value={fields.tags} onChange={handleChange} placeholder="e.g. rpg,fantasy,fbx" className="input" />
                </div>
                <div>
                    <label>License</label>
                    <input name="license" value={fields.license} onChange={handleChange} className="input" />
                </div>
            </div>

            {/* Media */}
            <div>
                <label>Description</label>
                <textarea name="description" value={fields.description} onChange={handleChange} className="input" />
            </div>
            <div>
                <label>Preview Image URL*</label>
                <input name="previewImage" value={fields.previewImage} onChange={handleChange} className="input" />
                {fields.previewImage && (
                    <img src={fields.previewImage} alt="Preview" className="w-48 h-32 object-cover mt-2 rounded" />
                )}
            </div>
            <div>
                <label>Video URL*</label>
                <input name="videoUrl" value={fields.videoUrl} onChange={handleChange} className="input" />
            </div>

            {/* Boolean */}
            <label className="inline-flex items-center gap-2 mt-4">
                <input
                    type="checkbox"
                    name="refundable"
                    checked={fields.refundable}
                    onChange={handleChange}
                />
                Refundable
            </label>

            {/* Feedback */}
            {error && <p className="text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Uploading...' : 'Upload Model'}
            </button>
        </form>
    );
}
