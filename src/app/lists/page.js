import TrendingList from "@/components/trendinglist";

const { default: BackArrow } = require("@/components/backarrow");
const { default: MooviBox } = require("@/components/heading");
const { default: SideBar } = require("@/components/sidebar");
function ListsPage(){
    const containerStyle = {
        width: '90%',
        height: '50%',
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '2%',
    }
    return(
        <>
            <MooviBox />
            <SideBar />
            <BackArrow />
            <h2 style={{textAlign: 'left', marginLeft: '4.5%', marginTop: '3%', color: 'rgba(159, 204, 46, 1)', fontWeight: 300}}>TRENDING RIGHT NOW</h2>
            <div style={containerStyle}>
                <TrendingList />
                <TrendingList />
                <TrendingList />
                <TrendingList />
            </div>
        </>
    )
}
export default ListsPage;