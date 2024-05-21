import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { DataToken } from '../controller/user/postUserLogin';

export type CustomReq = Request & { user?: DataToken };

export function isAdminRole(req: CustomReq, res: Response, next: NextFunction) {
    // Get the JWT token from the request headers
    const token = req.headers['authorization'] as string | undefined;

    if (!token || !process.env.SECRET_KEY) {
        return res.status(401).json({ message: 'Tokens or jwt secret key are not provided.' });
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');

    // Set a flag to determine if a response should be sent
    let errFlag = false;

    // Verify the JWT token
    jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            errFlag = true;
        }

        const dataDecoded = decoded as DataToken;

        if (dataDecoded.role === 'ADMIN') {
            req.user = dataDecoded;
        } else {
            errFlag = true;
        }
    });

    // Check if a response should be sent, and if not, send a default response
    if (errFlag) {
        return res.status(401).json({ message: 'Some thing went wrong!!!' });
    }

    return next(); // Call next middleware
}
