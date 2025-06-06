import { cookies } from 'next/headers';

export const setServerAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
    });
};

export const setServerCookie = async (name: string, value: string) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
    });
};

export const getServerAuthToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');
    return token?.value;
};
