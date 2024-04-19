import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type CustomReq = Request & { userId?: string };

export function authenticateToken(req: CustomReq, res: Response, next: NextFunction) {
    // Get the JWT token from the request headers
    const token = req.headers['authorization'] as string | undefined;

    if (!token || !process.env.SECRET_KEY) {
        return res.status(401).json({ message: 'Tokens or jwt secret key are not provided.' });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        req.userId = decoded.userId;
        next();
    });

    return res.status(401).json({ message: 'Some thing went wrong!!!' });
}
