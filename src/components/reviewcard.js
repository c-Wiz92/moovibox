import "../styles/global.css"

function ReviewCard({reviewText}){
    const reviewBoxStyle ={
        height: 200,
        width: 350,
        overflowY: "auto",
        border: '1px solid rgba(159, 204, 46, 1)',
        borderRadius: 10,
        padding: 10,
    }
    const userName = "Rohith A P";
    return(
        <>
            <div style={reviewBoxStyle} className="scroll">
                <p>{reviewText}</p>
            </div>
        </>
    )
}

export default ReviewCard;
