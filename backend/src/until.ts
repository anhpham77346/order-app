import fs from 'fs';
import path from 'path';

export async function saveBase64Image(base64String: string, dir: string, fileName: string): Promise<string> {
    try {
        // Đường dẫn tới thư mục lưu trữ ảnh trên máy chủ
        const uploadDir = path.join(`uploads${dir}`);

        // Tạo thư mục nếu nó không tồn tại
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Tạo đường dẫn đầy đủ tới tệp tin ảnh
        const imagePath = path.join(uploadDir, fileName);

        // Ghi dữ liệu base64 vào tệp tin
        await fs.promises.writeFile(imagePath, base64String, 'base64');

        // Trả về đường dẫn lưu trữ của ảnh
        return imagePath;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Failed to save image');
    }
}