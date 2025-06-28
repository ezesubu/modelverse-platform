import api from '@/lib/api';

export const getFilteredModels = async (params: any) => {

    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => {
            if (value === undefined || value === null || value === '') return false;
            if (typeof value === 'number') {
                // ⚠️ Excluir 0 SOLO para minPrice y maxPrice
                if ((key === 'minPrice' || key === 'maxPrice') && value === 0) {
                    return false;
                }
            }
            return true;
        })
    );

    const response = await api.get('/models3d', { params: filteredParams });
    return response.data;
};

export const getMyModels = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/models3d/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// export const getModelById = async (id: number | string) => {
//     const res = await api.get(`/models3d/${id}`);
//     return res.data;
// };

export const uploadModel = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const res = await api.post('/models3d', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const getModelById = async (id: number) => {
    const token = localStorage.getItem('token');
    const res = await api.get(`/models3d/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateModel = async (id: number, data: any) => {
    const token = localStorage.getItem('token');
    const res = await api.patch(`/models3d/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteModel = async (id: number) => {
    const token = localStorage.getItem('token');

    const res = await api.delete(`/models3d/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

