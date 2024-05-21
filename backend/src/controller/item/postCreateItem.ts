import { Response } from 'express';
import { CustomReq } from '../../middleware/userMiddleware';
import { ItemAvailability, ItemCategory } from '@prisma/client';
import { prisma } from '../../app';
import { saveBase64Image } from '../../until';

interface ReqType {
    name: string;
    description?: string;
    price: number;
    category: ItemCategory;
    availability: ItemAvailability;

    imgBase64?: string;
}

// Hàm tạo tên tệp tin duy nhất
function generateUniqueFilename(): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    return `item_${timestamp}_${randomString}`;
}

async function postCreateItem(req: CustomReq, res: Response) {
    try {
        const bodyData = req.body as ReqType;

        const imgLink = bodyData.imgBase64 ? await saveBase64Image(bodyData.imgBase64, '/items', generateUniqueFilename()) : null;

        // Tạo mới Item
        const newItem = await prisma.item.create({
            data: {
                name: bodyData.name,
                description: bodyData.description,
                price: bodyData.price,
                category: bodyData.category,
                availability: bodyData.availability,
                imgLink: imgLink,
            },
        });

        res.status(200).json({ message: 'thanh cong' });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default postCreateItem;
