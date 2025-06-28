const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
    }

    return res.json() as Promise<T>;
}


export const http = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, body: any) =>
        request<T>(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }),
    put: <T>(url: string, body: any) =>
        request<T>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),
    delete: <T>(url: string) =>
        request<T>(url, {
            method: 'DELETE',
        }),
};
