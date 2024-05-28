import { GetAllTableRes } from "../api/table/getAllTable";
import queryString from 'query-string';
import Button from "../atoms/Button";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import openTable from "../api/table/openTable";
import closeTable from "../api/table/closeTable";
import getOrderById, { GetOrderRes } from "../api/order/getOrderById";
import { GetAllItemRes } from "../api/item/getAllItem";
import QRCode from 'qrcode.react';

function BodyTableDetail({ data, data2 }: { data: GetAllTableRes[], data2: GetAllItemRes[] }) {
    const location = useLocation();
    const [tableData, setTableData] = useState<GetAllTableRes | null>(null); // Dữ liệu bảng được chọn
    const [listItem, setListItem] = useState<GetOrderRes[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [text, setText] = useState('');

    const open = async () => {
        if (tableData?.id) {
            const res = await openTable({ tableId: tableData.id }) as { stringCode: string };
            setTableData({ ...tableData, stringCode: res.stringCode, isActive: true });
            setText(`${import.meta.env.VITE_APP_HOST}/table-detail?stringCode=${res.stringCode}&type=dt`);
        }
    }

    const close = async () => {
        if (tableData?.id) {
            await closeTable({ tableId: tableData.id });
            setTableData({ ...tableData, isActive: false, stringCode: null });
        }
    }

    useEffect(() => {
        const params = queryString.parse(location.search);

        // Tìm kiếm bảng có id tương ứng trong danh sách data
        const selectedTable = data.find(table => table.id === Number(params.id));

        if (selectedTable) {
            setTableData(selectedTable); // Thiết lập dữ liệu bảng được chọn nếu tìm thấy
        }
    }, [data, location.search]);

    useEffect(() => {
        const params = queryString.parse(location.search);

        const fetchData = async () => {
            // get hóa đơn
            if (params.id) {
                const res = await getOrderById({ id: Number(params.id) });
                if (res) setListItem(res);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Tính tổng tiền khi danh sách mặt hàng thay đổi
        let total = 0;
        listItem.forEach(item => {
            const product = data2.find(e => e.id === item.itemId);
            if (product) {
                total += item.unitPrice;
            }
        });
        setTotalPrice(total);
    }, [listItem, data2]);


    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            {tableData?.isActive && <QRCode value={text} />}

            {tableData?.stringCode && <div className="my-3">Mã số bàn: {tableData?.stringCode}</div>}

            {listItem.map(i => (<div className="border-2 border-gray-300 w-full my-3 rounded-xl flex items-center">
                <div className="flex-1 flex gap-3 px-3">
                    <div className="flex justify-center items-center">
                        {data2.find(e => e.id === i.itemId)?.imgLink && <img src={`${import.meta.env.VITE_APP_API_FILE}${data2.find(e => e.id === i.itemId)?.imgLink}`} alt="" className="object-cover rounded-md h-[80px] w-[80px]" />}
                    </div>
                    <div className="flex-1 flex items-center">
                        <div>
                            <p className="font-medium break-all text-[20px]">{data2.find(e => e.id === i.itemId)?.name}</p>
                            <p className="font-medium break-all">{data2.find(e => e.id === i.itemId)?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center px-3">
                    <div>
                        <p className="text-center font-bold w-[100px]">{i.unitPrice.toLocaleString('vi-VN')} VND</p>
                    </div>
                </div>
            </div>))}

            {/* Hiển thị tổng tiền */}
            <div className="mt-4 text-right">
                <p className="text-lg font-semibold">Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND</p>
            </div>

            {tableData?.isActive ? (
                <Button onClick={close} typeBtn={"primary"} type={"button"} className="w-full">Đóng</Button>
            ) : (
                <Button onClick={open} typeBtn={"primary"} type={"button"} className="w-full">Mở</Button>
            )}
        </div>
    );
};

export default BodyTableDetail;