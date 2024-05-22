import { useEffect } from "react";

function BodyTableDetail() {
    const hasJoinedTable = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-table`);

    useEffect(() => {
        const fetchData = async () => {
            // get hóa đơn
            console.log(hasJoinedTable);
            
        };

        fetchData();
    }, []);

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="font-semibold text-[20px]">Hoá đơn của bạn</div>
        </div>
    );
};

export default BodyTableDetail;