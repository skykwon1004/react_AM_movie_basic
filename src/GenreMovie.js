import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import CommonStyle from './style/Grobal';
import { BsArrowLeft, BsArrowRight, BsX, BsSearchHeart } from "react-icons/bs";

import MovieSlide from 'react-slick';
import 'slick-carousel/slick/slick.css';

//장르
const Inner = styled.div`
max-width: 1600px;
margin: 0 auto;
`
const GridLayout = styled.ul`
display: grid;
/* mediaQuey 없이 반응형 만들기 1 */
/* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
grid-template-columns: repeat(5,1fr);
gap: 10px;
`
const GridItm = styled.li`
position: relative;
overflow: hidden;
border-radius: 5px;

&:hover Img {
    transform: scale(1.1);

}
`
const Img = styled.img`
transition: 0.5s;
`
const Title = styled.strong`
position: absolute;
top: 0;
left: 0;
right: 0;
padding: 10px;
font-size: 19px;
font-weight: 500;
color: #fff;
line-height: 1.3;
background: rgba(0,0,0,0.7);
border-bottom: 1px solid #f44f53;
border-bottom: 1px solid rgb(85, 85, 85, 0.7);
border-radius: 5px 5px 0 0;
`
const Desc = styled.span`
position: absolute;
bottom: 0;
left: 0;
right: 0;
color: #fff;
background: rgba(0,0,0,0.7);
padding: 20px;
font-size: 15px;
line-height: 1.3;
min-height: 100px;
border-radius: 0 0 5px 5px;
`
const GenreMovieWrapper = styled.section`
padding: 100px 0;
color: #fff;
`
const GenreMovieTitle = styled.h2`
/* position: relative; */
font-size: 35px;
font-weight: 700;
color: #fff;
width: 1600px;
margin: 0 auto 20px auto;

&::after {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 0 0 10px;
    background: #e5295b;
    background: #c2ae65;
    border-radius: 50%;
}
`

// 장르
const GenreMovie = ({ genre, setOn }) => {
    const [genreList, setGenreList] = useState([]);
    const genreMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?genre=${genre}&limit=10`);
        setGenreList(r.data.data.movies);
    }
    useEffect(() => {
        genreMovie()
    }, [])

    return (
        <GenreMovieWrapper>
            <GenreMovieTitle>{genre}</GenreMovieTitle>
            <Inner>
                <GridLayout>
                    {
                        genreList.map((it, idx) => {
                            return (
                                <GridItm key={it.id} onClick={() => setOn(true)}>
                                    <Link to={`/genre/${it.id}`}>
                                        <Img src={it.large_cover_image}
                                            alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                        />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.summary.length > 10 &&
                                            <Desc>
                                                {it.summary.substr(0, 50)}
                                                {it.summary.length > 50 ? '...' : ''}
                                            </Desc>
                                        }
                                    </Link>

                                </GridItm>
                            )
                        })

                    }
                </GridLayout>
            </Inner>
        </GenreMovieWrapper >
    )
}


export default GenreMovie;