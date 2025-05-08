function TrendingList(){
    const trendingList = "/assets/moneyheist.jpg";
    const imageStyle = {
        width: '100%',
    }
    const addedStyle ={
        textAlign: 'left',
        color: 'rgba(159, 204, 46, 1)',
        fontSize: 15,
    }
    const containerStyle ={
        width: '15%',
    }
    const userStyle = {
        textAlign: 'right',
    }
    return(
        <>
            <div style={containerStyle}>
                <img style={imageStyle} src={trendingList}></img>
                <p style={addedStyle}>added by 120 others</p>
                <h2 style={userStyle}>Rohith</h2>
            </div>
        </>
    )
}
export default TrendingList;