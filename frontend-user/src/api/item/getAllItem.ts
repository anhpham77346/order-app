export interface GetAllItemRes {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: "DESSERT" | "MAIN_COURSE" | "APPETIZER" | "BEVERAGE" | "SNACK";
    availability: boolean;
    createdAt: string;
    deletedAt: string | null;
    imgLink: string | null;
}

async function getAllItem() {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/item/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    if (res.ok) {
        return (await res.json()) as GetAllItemRes[];
    } else {
        throw Error('Failed!!!');
    }
}

export default getAllItem;