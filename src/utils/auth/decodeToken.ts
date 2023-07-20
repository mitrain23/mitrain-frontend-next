import jwt from 'jsonwebtoken';

export const decodeToken = (): number | any => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt.decode(token) as { userId: string };
                if (decodedToken) {
                    const userId = parseInt(decodedToken.userId, 10);
                    return userId;
                }
            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        }
    }
    return null
};
