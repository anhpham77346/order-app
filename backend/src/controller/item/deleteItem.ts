import { Response } from 'express';
import { prisma, Request } from '../../app';

interface ReqType {
    itemId: number
}

async function deleteItem(req: Request, res: Response) {
    try {
        const bodyData = req.body as ReqType;

        // Tạo mới Item
        const deleteItem = await prisma.item.update({
            where: {
                id: bodyData.itemId
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

export default deleteItem;
