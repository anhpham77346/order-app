import { useEffect, useState } from "react";
import getOrder, { GetOrderRes } from "../api/order/getOrder";
import { GetAllItemRes } from "../api/item/getAllItem";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

function BodyTableDetail({ data }: { data: GetAllItemRes[] }) {
    const hasJoinedTable = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-table`);
    const navigate = useNavigate();
    const [listItem, setListItem] = useState<GetOrderRes[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get hóa đơn
                if (hasJoinedTable) {
                    const res = await getOrder({ stringCode: hasJoinedTable });
                    if (res) setListItem(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                navigate(routes.home);
                localStorage.removeItem(`${import.meta.env.VITE_APP_API_URL}-table`)
            }
        };

        fetchData();
    }, [hasJoinedTable]);

    useEffect(() => {
        // Tính tổng tiền khi danh sách mặt hàng thay đổi
        let total = 0;
        listItem.forEach(item => {
            const product = data.find(e => e.id === item.itemId);
            if (product) {
                total += item.unitPrice;
            }
        });
        setTotalPrice(total);
    }, [listItem, data]);

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="font-semibold text-[20px]">Hoá đơn của bạn</div>

            {/* list hoá đơn */}
            {listItem.map(i => (<div className="border-2 border-gray-300 w-full my-3 rounded-xl flex items-center">
                <div className="flex-1 flex gap-3 px-3">
                    <div className="flex justify-center items-center">
                        {data.find(e => e.id === i.itemId)?.imgLink && <img src={`${import.meta.env.VITE_APP_API_FILE}${data.find(e => e.id === i.itemId)?.imgLink}`} alt="" className="object-cover rounded-md h-[80px] w-[80px]" />}
                    </div>
                    <div className="flex-1 flex items-center">
                        <div>
                            <p className="font-medium break-all text-[20px]">{data.find(e => e.id === i.itemId)?.name}</p>
                            <p className="font-medium break-all">{data.find(e => e.id === i.itemId)?.description}</p>
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
        </div>
    );
};

export default BodyTableDetail;