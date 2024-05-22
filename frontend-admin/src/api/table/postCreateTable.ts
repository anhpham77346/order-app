async function postCreateTable(data: {
    name: string;
    seatingCapacity: number;
}) {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/table/create`, {
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

export default postCreateTable;