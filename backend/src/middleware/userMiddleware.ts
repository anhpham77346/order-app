import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { DataToken } from '../controller/user/postUserLogin';

type CustomReq = Request & { user?: DataToken };

export function isAdminRole(req: CustomReq, res: Response, next: NextFunction) {
    // Get the JWT token from the request headers
    const token = req.headers['authorization'] as string | undefined;

    if (!token || !process.env.SECRET_KEY) {
        return res.status(401).json({ message: 'Tokens or jwt secret key are not provided.' });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        const dataDecoded = decoded as DataToken;

        if (dataDecoded.role === 'ADMIN') {
            req.user = dataDecoded;
            next();
        }
    });

    return res.status(401).json({ message: 'Some thing went wrong!!!' });
}
