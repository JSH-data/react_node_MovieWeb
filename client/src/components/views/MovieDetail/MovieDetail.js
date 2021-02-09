import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './sections/MovieInfo'
import { Row } from 'antd'
import GridCards from '../commons/GridCards'
import Favorite from '../MovieDetail/sections/Favorite'

function MovieDetail(props) {
    
    let movieId = props.match.params.movieId // 주소에서 movieId를 가져옵니다. 

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        
        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
            
        })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }



    return (
        <div>
            {Movie.backdrop_path &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview} 
                />
            }

            <div style={{ width:' 85%', margin:'1rem auto' }}>

                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                    <Favorite  movieInfo={Movie} movieId={movieId} userFrom={ localStorage.getItem('userId')}/>
                </div>


                {Movie &&
                    <MovieInfo 
                        movie={Movie}
                    />
                }
                

                <br />

                {ActorToggle && 
                    <Row gutter={[16, 16]}>                
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}> 
                                <GridCards 
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    castName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }


                <div style={{ display: 'flex', justifyContent:'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
