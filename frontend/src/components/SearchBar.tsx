'use client';

import { useState } from 'react';

export type SearchParams = {
    tags?: string;
    author?: string;
    format?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
};

export default function SearchBar({
                                      onSearch,
                                  }: {
    onSearch: (params: SearchParams) => void;
}) {
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('');
    const [format, setFormat] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('uploadedAt');
    const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            tags,
            author,
            format,
            minPrice: Number(minPrice),
            maxPrice: Number(maxPrice),
            sort,
            order,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="border px-3 py-2 rounded"
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border px-3 py-2 rounded"
            />
            <input
                type="text"
                placeholder="Format (glb, fbx...)"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="border px-3 py-2 rounded"
            />
            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border px-3 py-2 rounded"
            />
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border px-3 py-2 rounded"
            />
            <div className="flex gap-2">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="uploadedAt">Date</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value as 'ASC' | 'DESC')}
                    className="border px-3 py-2 rounded"
                >
                    <option value="DESC">↓</option>
                    <option value="ASC">↑</option>
                </select>
            </div>
            <button
                type="submit"
                className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Search
            </button>
        </form>
    );
}
