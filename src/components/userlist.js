function UserList({info}){
    const imgStyle = {
        width: '15%',
    }
    return (
        <>
            <img src={`https://image.tmdb.org/t/p/original${info.poster_path}`} style={imgStyle}></img>
        </>
    )
}

export default UserList;