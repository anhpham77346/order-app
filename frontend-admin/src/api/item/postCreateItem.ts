async function postCreateItem(data: {
    name: string;
    description?: string;
    price: number;
    category: "DESSERT" | "MAIN_COURSE" | "APPETIZER" | "BEVERAGE" | "SNACK";
    availability: boolean;

    imgBase64?: string;
}) {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/item/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        return (await res.json());
    } else {
        throw Error('Failed!!!');
    }
}

export default postCreateItem;