import jwt from 'jsonwebtoken';

interface JWTPayload {
    data: string;
    iat: number;
    exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (payload: string): string => {
    return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
