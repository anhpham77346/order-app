import { Response } from 'express';
import { prisma, Request } from '../../app';

interface DataReq {
    stringCode: string;
}

async function joinTable(req: Request, res: Response) {
    try {
        const { stringCode } = req.body as DataReq;
   
        const f = await prisma.table.findUnique({
            where: {
                stringCode: stringCode
            }
        });

        if (f) {
            res.json({ stringCode: stringCode });
            return;
        }

        res.status(500).json({ message: 'Something went wrong' });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default joinTable;
