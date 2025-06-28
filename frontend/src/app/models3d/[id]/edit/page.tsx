'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EditModelForm from '@/components/EditModelForm';
import { getModelById } from '@/services/models3d.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function EditModelPage() {
    useAuthGuard();

    const { id } = useParams();
    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getModelById(Number(id)).then((res) => {
            setModel(res);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!model) return <p>Model not found.</p>;

    return (
        <div className="p-6">
            <EditModelForm model={model} />
        </div>
    );
}
