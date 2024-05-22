import { Response } from 'express';
import { prisma, Request } from '../../app';

interface DataReq {
    tableId: number;
}

async function closeTable(req: Request, res: Response) {
    try {
        const { tableId } = req.body as DataReq;

        await prisma.table.update({
            where: {
                id: tableId
            },
            data: {
                isActive: false,
                stringCode: null
            }
        });

        await prisma.order.create({
            data: {
                tableId: tableId
            }
        });

        res.json({ message: 'dong thanh cong' });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default closeTable;
