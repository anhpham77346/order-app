async function openTable(data: { tableId: number }) {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/table/open`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId: data.tableId })
    });

    if (res.ok) {
        return (await res.json()) as { stringCode: string };
    } else {
        throw Error('Failed!!!');
    }
}

export default openTable;