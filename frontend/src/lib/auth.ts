import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.sub;
    } catch {
        return null;
    }
};
