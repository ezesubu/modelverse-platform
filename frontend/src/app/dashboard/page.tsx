'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar, { SearchParams } from '@/components/SearchBar';
import { getFilteredModels } from '@/services/models3d.service';

export default function DashboardPage() {
    const [models, setModels] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<SearchParams>({});
    const limit = 12;

    const fetchModels = async (filtersOverride = filters, pageOverride = page) => {
        try {
            const res = await getFilteredModels({
                ...filtersOverride,
                page: pageOverride,
                limit,
            });
            setModels(res.data);
            setTotal(res.total);
        } catch (err) {
            console.error('Error loading models:', err);
        }
    };

    useEffect(() => {
        fetchModels();
    }, [page]);


    const handleSearch = (newFilters: SearchParams) => {
        setFilters(newFilters);
        setPage(1); // reset to page 1
        fetchModels(newFilters, 1);
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {models.map((model: any) => (
                    < Link href={`/models3d/${model.id}`}>
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

            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    ← Prev
                </button>

                <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
