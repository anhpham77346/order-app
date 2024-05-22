import { Response } from 'express';
import { prisma, Request } from '../../app';

interface DataReq {
    tableId: number;
}

function generateStringCode(length: number) {
    let result = '';
    const characters = '0123456789'; // Các ký tự cho phép trong mã

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

async function openTable(req: Request, res: Response) {
    try {
        const { tableId } = req.body as DataReq;

        let stringCode = generateStringCode(10); // Tạo một stringCode ban đầu

        let isDuplicate = true;
        while (isDuplicate) {
            // Kiểm tra xem có bất kỳ bản ghi nào có stringCode trùng với tableId hay không
            const existingTable = await prisma.table.findFirst({
                where: {
                    stringCode: stringCode
                }
            });

            if (!existingTable) {
                // Nếu không có bản ghi nào trùng, thoát khỏi vòng lặp
                isDuplicate = false;
            } else {
                // Nếu có, tạo một stringCode mới và tiếp tục kiểm tra
                stringCode = generateStringCode(10);
            }
        }

        const upData = await prisma.table.update({
            where: {
                id: tableId
            },
            data: {
                isActive: true,
                stringCode: stringCode
            }
        });

        await prisma.order.create({
            data: {
                tableId: tableId
            }
        });

        res.json({ stringCode: stringCode });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default openTable;
