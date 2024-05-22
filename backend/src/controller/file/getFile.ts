import { Response } from 'express';
import fs from 'fs';
import { Request } from '../../app';

async function getFile(req: Request, res: Response) {
    try {
        const { path } = req.query;

        if (typeof path !== 'string') {
            res.status(400).send('Invalid file path');
            return;
        }

        const fileStream = fs.createReadStream(path);

        // Check if file exists
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).send('File not found');
            } else {
                res.set('Content-Type', 'image/png');
                fileStream.pipe(res);
            }
        });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default getFile;
