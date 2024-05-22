import { GetAllTableRes } from "../api/table/getAllTable";
import Table from "./Table";

function BodyTable({ data }: { data: GetAllTableRes[] }) {
    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Nhập mã số bàn</p>
                </div>
            </div>
            {data.map(i => (
                <Table key={i.id} data={i}></Table>
            ))}
        </div>
    );
};

export default BodyTable;