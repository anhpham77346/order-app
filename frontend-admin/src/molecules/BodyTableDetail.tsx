import { GetAllTableRes } from "../api/table/getAllTable";
import queryString from 'query-string';
import Button from "../atoms/Button";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import openTable from "../api/table/openTable";
import closeTable from "../api/table/closeTable";

function BodyTableDetail({ data }: { data: GetAllTableRes[] }) {
    const location = useLocation();
    const [tableData, setTableData] = useState<GetAllTableRes | null>(null); // Dữ liệu bảng được chọn

    const open = async () => {
        if (tableData?.id) {
            const res = await openTable({ tableId: tableData.id }) as { stringCode: string };
            setTableData({ ...tableData, stringCode: res.stringCode, isActive: true });
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


    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            {tableData?.stringCode && <div className="my-3">Mã số bàn: {tableData?.stringCode}</div>}
            {tableData?.isActive ? (
                <Button onClick={close} typeBtn={"primary"} type={"button"} className="w-full">Đóng</Button>
            ) : (
                <Button onClick={open} typeBtn={"primary"} type={"button"} className="w-full">Mở</Button>
            )}
        </div>
    );
};

export default BodyTableDetail;