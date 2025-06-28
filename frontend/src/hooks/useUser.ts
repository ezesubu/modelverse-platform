export function useUser() {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    } catch {
        return null;
    }
}
