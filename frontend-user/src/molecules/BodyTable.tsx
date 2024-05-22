import { ChangeEvent, useState } from "react";
import joinTable from "../api/table/joinTable";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

function BodyTable() {
    const navigate = useNavigate();
    const [tableCode, setTableCode] = useState("");

    const join = async () => {
        const res = await joinTable({ stringCode: tableCode });

        if (res?.stringCode) {
            localStorage.setItem(`${import.meta.env.VITE_APP_API_URL}-table`, res.stringCode);
            navigate(`${routes.tableDetail}?stringCode=${res.stringCode}`);
        }
    }

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Nhập mã số bàn</p>
                </div>
            </div>
            <div className="flex gap-3 mt-20">
                <Input type={"text"} placeholder="Mã số bàn" onChange={(event: ChangeEvent<HTMLInputElement>) => { setTableCode(event.target.value); }}></Input>
                <Button onClick={join} typeBtn={"primary"} type={"submit"} className="w-[100px]">Join</Button>
            </div>
        </div>
    );
};

export default BodyTable;