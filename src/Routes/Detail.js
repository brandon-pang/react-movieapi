import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import noImg from "../assets/noPosterSmall.png"

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

export default function Detail({
    location: { pathname },
    match: { params: { id } },
    history: { push }
}) {
    /* eslint-disable*/
    const isMovie = pathname.includes("/movie/")
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                return push("/")
            }
            let result = null;
            try {
                if (isMovie) {
                    ({ data: result } = await moviesApi.movieDetail(parsedId));
                } else {
                    ({ data: result } = await tvApi.showDetail(parsedId));
                }
                setResult(result)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return loading ? (
        <>
            <Helmet>
                <title>Loading | Betflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
            <Container>
                <Helmet>
                    <title>
                        {result.original_title ? result.original_title : result.original_name}{" "}
          | Betflix
        </title>
                </Helmet>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                />
                <Content>
                    <Cover
                        bgImage={
                            result.poster_path
                                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                : noImg
                        }
                    />
                    <Data>
                        <Title>
                            {result.original_title
                                ? result.original_title
                                : result.original_name}
                        </Title>
                        <ItemContainer>
                            <Item>
                                {result.release_date
                                    ? result.release_date.substring(0, 4)
                                    : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length - 1
                                            ? genre.name
                                            : `${genre.name} / `
                                    )}
                            </Item>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                    </Data>
                </Content>
            </Container>
        );
    /* eslint-enable*/
}
