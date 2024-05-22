import { Response } from 'express';
import { prisma, Request } from '../../app';

interface ReqType {
    tableId: number
}

async function deleteTable(req: Request, res: Response) {
    try {
        const bodyData = req.body as ReqType;

        // Tạo mới Item
        await prisma.table.update({
            where: {
                id: bodyData.tableId
            },
            data: {
                deletedAt: new Date()
            }
        });

        res.status(200).json({ message: 'thanh cong' });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default deleteTable;
