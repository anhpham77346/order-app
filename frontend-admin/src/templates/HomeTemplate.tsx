import BodyMenu from "../molecules/BodyMenu";
import Hearder from "../molecules/Hearder";
import Sidebar from "../organisms/Sidebar";

interface HomeTemplateProps {
    type: 'MENU';
}

function HomeTemplate({ type }: HomeTemplateProps) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Hearder />
                {type === 'MENU' && <BodyMenu />}
            </div>
        </div>
    );
};

export default HomeTemplate;