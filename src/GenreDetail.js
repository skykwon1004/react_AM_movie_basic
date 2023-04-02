import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import CommonStyle from './style/Grobal';
import { BsArrowLeft, BsArrowRight, BsX, BsSearchHeart } from "react-icons/bs";

import MovieSlide from 'react-slick';
import 'slick-carousel/slick/slick.css';
import GenreMovie from "./GenreMovie";


// 디테일
const MoviePopWapper = styled.div`
position: fixed;
inset:  0 0 0 0;
z-index: 999;
background: rgb(17, 17, 17, 0.5);
`
const MoviePop = styled.div`
position: absolute;
inset: 50% auto auto 50%;
transform: translate(-50%,-50%);

display: grid;
grid-template-columns: repeat(2, 1fr);
background: #242424;
color: #fff;

width: 1000px;
`
const MoviePopDesc = styled.div`
position:relative;
display: flex;
flex-direction: column;
padding: 50px;

overflow: hidden;
`
const MoviePopDescTitle = styled.h3`
font-size: 30px;
font-weight: 700;
margin: 0 0 30px 0;
`
const MoviePopDescDesc = styled.p`
font-size: 14px;
font-weight: 300;
line-height: 1.414;
`
const MoviePopDescYear = styled.p`
margin: auto 0 10px 0;
font-size: 14px;
font-weight: 300;
`
const MoviePopDescGenres = styled.ul`
font-size: 14px;
font-weight: 500;

display: flex;
flex-wrap: wrap;
gap: 10px;
`
const Genre = styled.li``
const MovieDetailClose = styled.span`
position: absolute;
inset: 0 0 auto auto;
font-size: 30px;
padding: 10px;
color: #111;
background: #c2ae65;
cursor: pointer;
`

//검색
const GenreDetail = ({ genreList, on, setOn }) => {
    const { id } = useParams();
    // console.log("cc", id);
    // 1 === '1'
    const detailMovie = genreList?.find(it => String(it.id) === id);
    const cover = useRef();

    // let mo = null;
    // const getIdMovie = async () => {
    //     const r = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    //     console.log("ttt : ", r.data.movie);
    //     console.log("ttt : ", r.data.data.movie);

    // }

    // getIdMovie();

    //https://stackoverflow.com/questions/65455975/using-useref-addeventlistener 참조
    // Useref는 rerender를 트리거하지 않고 useEffect 이전에 바인딩된 ref 객체입니다. 요소 없이 el.current를 사용하십시오.
    const scrollHandler = e => {
        e.preventDefault()
    }
    useEffect(() => {
        if (cover.current) {
            cover.current.addEventListener('wheel', scrollHandler);
            // return () => {
            //     cover.current.removeEventListener("scroll", scrollHandler);
            // };
        }
    }, [cover.current]);



    return (
        <>
            {
                detailMovie && on &&
                <MoviePopWapper

                    ref={cover}
                >
                    <MoviePop>
                        <div>
                            <img src={detailMovie.large_cover_image} alt="" />
                        </div>
                        <MoviePopDesc>
                            <MoviePopDescTitle>{detailMovie.title}</MoviePopDescTitle>
                            <MoviePopDescDesc>{detailMovie.description_full.substr(0, 400)}</MoviePopDescDesc>
                            <MoviePopDescYear>{detailMovie.year}</MoviePopDescYear>
                            <MoviePopDescGenres>
                                {
                                    detailMovie.genres?.map((it, idx) => {
                                        return <Genre key={idx}>{it}</Genre>
                                    })
                                }
                            </MoviePopDescGenres>
                            <MovieDetailClose onClick={() => setOn(false)}><BsX /></MovieDetailClose>
                        </MoviePopDesc>
                    </MoviePop>
                </MoviePopWapper>
            }Title
        </>
    )
}

export default GenreDetail;