import Content from "../organisms/Content";
import Sidebar from "../organisms/Sidebar";

function HomeTemplate() {
    return (
        <div className="flex">
            <Sidebar />
            <Content />
        </div>
    );
};

export default HomeTemplate;