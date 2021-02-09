import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { Button } from 'antd'


function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;


    const [FavoriteNumber, setFavoriteNumber] = useState()
    const [Favorited, setFavorited] = useState()

    let variables = {
        userFrom,  // userFrom : userFrom
        movieId,
        movieTitle,
        moviePost,
        movieRuntime
    }
    
    useEffect(() => {

       Axios.post('/api/favorite/favoriteNumber', variables) // 다양한 정보를 서버로 보냅니다. 앞에 있는 주소는 우리가 임의로 정합니다.
        .then(response => { 
            if(response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패 했습니다. ')
            }
        })
        
        Axios.post('/api/favorite/favorited', variables) // 다양한 정보를 서버로 보냅니다. 앞에 있는 주소는 우리가 임의로 정합니다.
        .then(response => { 
            if(response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert('정보를 가져오는데 실패 했습니다. ')
            }
        })
        
    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 삭제하지 못했습니다. ')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에 추가하지 못했습니다. ')
                    }
            })
        }
    }    
    return (
        <div>
            <Button onClick={onClickFavorite}> {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </Button>
        </div>
    )
};

export default Favorite
