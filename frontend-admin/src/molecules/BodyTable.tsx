import { useNavigate } from "react-router-dom";
import { GetAllTableRes } from "../api/table/getAllTable";
import Button from "../atoms/Button";
import Table from "./Table";
import { routes } from "../routes";

function BodyTable({ data }: { data: GetAllTableRes[] }) {
    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Table</p>
                </div>

                <Button onClick={() => { navigate(routes.addTable) }} typeBtn={"primary"} type={"button"}>Thêm</Button>
            </div>
            {data.map(i => (
                <Table key={i.id} data={i}></Table>
            ))}
        </div>
    );
};

export default BodyTable;