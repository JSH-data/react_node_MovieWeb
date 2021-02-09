import React, { useEffect, useState } from 'react'
import { Row } from 'antd'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'

function LandingPage() {
    
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null) // 초기 이미지 값이 NULL이라는 의미입니다. 
    const [currentPage, setcurrentPage] = useState(0)

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endPoint)
              
            
    }, [])
        

    const fetchMovies = (endPoint) => {
        fetch(endPoint) // api를 가져오는 Fetch 함수
            .then(response => response.json()) // json형식으로 불러와야합니다. 
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results]) // 받은 data 즉 response를 Movies state에 넣어줍니다. 또한 그것을 배열화 합니다.  ...을 넣어주어 모든 이미지 파일을 불러오는데 성공했습니다. 결과들을 Spread 시켜줍니다. 
                setMainMovieImage(response.results[0])
                setcurrentPage(response.page)
            
        })  // ...Movies는 more버튼을 눌러도 Movies가 초기화되지 않고 누적되어 쌓일 수 있게 도와줍니다.  
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endPoint)
    }

    return (
        <div style={{ width:'100%', margin: '0' }}>
            {MainMovieImage && /*전부다 받아오면 MainImage를 로드해주세요*/
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview} 
                /> /*props로 이미지 타이틀 텍스트를 전달합니다. MainImage는 이 이미지를 전달받습니다.*/
            }    
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />
                <Row gutter={[16, 16]}>                {/*각 이미지에다 약간의 margin을 넣어줍니다. */}
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}> 
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}

                </Row>
                        
            </div>
            <div style= {{ display:'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load  More </button>
            </div>

        </div>
    )
}

export default LandingPage
