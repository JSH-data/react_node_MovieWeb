import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoriteMovie()
    }, [])

    const fetchFavoriteMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', { userFrom : localStorage.getItem('userId') })
            .then(response => {
                if(response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화정보를 가져오는데 실패했습니다.')
                }
            })       
    }

    // 앞선 상황과는 다르게 누를때 그에 대한 정보를 같이 전달해 주기위해서 인자를 전달하는 방식으로 변경합니다. 
    const onClickDelete = (movieId, userFrom) => { 
        
        const variables = {
            movieId,
            userFrom
        }

        Axios.post("/api/favorite/removeFromFavorite", variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoriteMovie()
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "No Image" }
            </div>
        )
        
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>       
            <td>{favorite.movieRuntime} mins</td>
            <td>
                <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button> 
            </td>
        </tr>
    })

    return (
        <div style={{ width:'85%', margin:'3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
