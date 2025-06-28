'use client';

import UploadForm from '@/components/UploadForm';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function UploadModelPage() {
    useAuthGuard(); // 🔐 protege

    return (
        <div className="p-6">
            <UploadForm />
        </div>
    );
}
