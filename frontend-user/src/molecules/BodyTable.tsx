import Button from "../atoms/Button";
import Input from "../atoms/Input";

function BodyTable() {
    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Nhập mã số bàn</p>
                </div>
            </div>
            <div className="flex gap-3 mt-20">
                <Input type={"text"} placeholder="Mã số bàn"></Input>
                <Button typeBtn={"primary"} type={"submit"} className="w-[100px]">Join</Button>
            </div>
        </div>
    );
};

export default BodyTable;