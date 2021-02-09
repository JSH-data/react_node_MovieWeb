import React from 'react';
import { Col } from 'antd';


function GridCards(props) {

    if(props.landingPage) {
        return (
            <div>
                <Col lg={6} md={8} xs={24}> {/*한 컬럼에 몇개가 들어가는지 확인합니다/ */}
                    <div style={{ position: 'relative' }}>
                        <a href={`movie/${props.movieId}`}>
                            <img style={{ width:'100%', height: '320px' }} src={ props.image } alt= { props.movieName } />
                        </a>
                    </div>
                </Col>
            </div>
        )
    } else {
        return (
            <div>
                <Col lg={6} md={8} xs={24}> {/*한 컬럼에 몇개가 들어가는지 확인합니다/ */}
                    <div style={{ position: 'relative' }}>
                            <img style={{ width:'100%', height: '320px' }} src={ props.image } alt= { props.castName } />
                    </div>
                </Col>
            </div>
        )
    }
}

export default GridCards
