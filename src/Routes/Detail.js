import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import noImg from "../assets/noPosterSmall.png"
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouTube from "react-youtube";
import noLogoImg from "../assets/noPosterSmall.png"
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

const ItemContainer = styled.ul`
  margin: 20px 0;
  display:flex;
  justify-content:flex-start; 
  align-items:center;
`;

const Item = styled.li`
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  color:yellow;
  transition: color .3s ease-out;
  &:hover{
      color:white;
      transition: color .3s ease-in;
  }
`;
const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.8;
  line-height: 1.5;
  padding-left:20px;
  width: 100%;
`;

const ExtraInfoContainer = styled.section`
    margin-top: 20px;
    height: 55%;
`;
const TabBtnWarp = styled.ul`
    display: flex;
    align-items: center;
`;
const TabItem = styled.li`
    height: 40px;
    width: 100px;
    margin-right:4px;
`;
const BtnStyle = styled.button`
    height: 100%;
    width: 100%;
    font-weight:bold;
    color: white;
    border: none;
    cursor: pointer;
    border-radius:10px 10px 0 0;
    outline:none;
    ${props => props.selected ? `
    background: #3498db;
    `: `
    background: rgb(20,20,20);
    `}
    &:hover{
        background: #3498db;
    }
`;
const TabDetail = styled.div`
    overflow: auto;
    width:100%;
    height: 100%;
    background-color: rgb(20,20,20);
    padding: 10px 0px;
    border-radius:0 10px 10px 0;
`;

const VideoWrap = styled.ul`
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap:wrap;
    padding:10px;
    width:100%;
    transition: all .6s ease-in;
`;

const VidItem = styled.li`
    display: flex;
    justify-content:center;
    align-items: center;
    margin:10px;
`;


const ProductionCont = styled.section`
    display: flex;
    justify-content:center;
    align-items: flex-start;
    flex-direction:column;
    padding:10px;
    width:100%;
    transition: all .6s ease-in;
`;
const CountryCont = styled.div`
    margin:10px;
`;
const CountryTitle = styled.p`
margin-bottom:10px;
    font-size:32px;
    font-weight:bold;
`;
const CountryWrap = styled.ul`
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap:wrap;
    width:100%;
`;
const CountryItem = styled.li`
    padding:10px;
    display: flex;
    justify-content:center;
    align-items: center;
`;
const CountryName = styled.p`
    font-size:14px;
    font-weight:bold;
`;
const CompanyCont = styled.section`
    margin:10px;
`;
const CompanyTitle = styled.p`
    margin-bottom:10px;
    font-size:32px;
    font-weight:bold;
`;
const CompanyWrap = styled.ul`
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap:wrap;
    width:100%;
`;
const CompanyItem = styled.li`
    padding:10px;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
`;

const CompanyImage = styled.div`
  background-image: url(${props => props.bgUrl});
  width: 160px;
  height: 180px;
  background-size: 100% auto;
  background-position: center center;
  background-repeat:no-repeat;
  transition: opacity 0.1s linear;
  margin-bottom:10px;
  border-color:whitesmoke;
`;
const CompanyName = styled.p`
    font-size:14px;
    font-weight:bold;
`;

const SeasonCont = styled.section`
    margin:10px;
    transition: all .6s ease-in;
    
`;
const SeasonName = styled.p`
    font-size:14px;
    font-weight:bold;
`;
const SeasonDate = styled.p`
    font-size:12px;
    color:#999;
    font-weight:bold;
`;
const SeasonWrap = styled.ul`
    display: flex;
    justify-content:flex-start;
    align-items: center;
    flex-wrap:wrap;
    width:100%;
`;
const SeasonItem = styled.li`
    padding:10px;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
`;
const SeasonPosterImage = styled.div`
  background-image: url(${props => props.bgUrl});
  width: 140px;
  height: 200px;
  background-size: 100% auto;
  background-position: center center;
  background-repeat:no-repeat;
  transition: opacity 0.1s linear;
  margin-bottom:10px;
  border-color:whitesmoke;
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
    const [tabIndex, setTabIndex] = useState(0);
    const opts = {
        height: '240',
        width: '420',
    };
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
                            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length - 1
                                            ? genre.name
                                            : `${genre.name} / `
                                    )}
                            </Item>
                            {result && result.vote_average && (
                                <>
                                    <Divider>•</Divider>
                                    <Item>
                                        <span role="img" aria-label="rating">👍</span>
                                        {" "}
                                        {result.vote_average}
                                    </Item>
                                </>
                            )}
                            {result.imdb_id && (
                                <>
                                    <Divider>•</Divider>
                                    <Item>
                                        <a
                                            href={`https://www.imdb.com/title/${result.imdb_id}`}
                                            target="blank"
                                        >
                                            <SFontAwesomeIcon icon={faImdb} />
                                        </a>
                                    </Item>
                                </>
                            )}
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        <ExtraInfoContainer>
                            <TabBtnWarp>
                                <TabItem><BtnStyle selected={tabIndex === 0} onClick={() => setTabIndex(0)}>Videos</BtnStyle></TabItem>
                                <TabItem><BtnStyle selected={tabIndex === 1} onClick={() => setTabIndex(1)}>Productions</BtnStyle></TabItem>
                                {!isMovie &&
                                    <TabItem ><BtnStyle selected={tabIndex === 2} onClick={() => setTabIndex(2)}>Seasons</BtnStyle></TabItem>
                                }
                            </TabBtnWarp>
                            <TabDetail>
                                {tabIndex === 0 &&
                                    <VideoWrap>
                                        {result.videos.results ? (
                                            result.videos.results.map(
                                                (item) => (
                                                    <VidItem key={item.key}>
                                                        <YouTube videoId={item.key} opts={opts} />
                                                    </VidItem>
                                                )
                                            )
                                        ) : ("There are no video clips!")
                                        }
                                    </VideoWrap>
                                }
                                {tabIndex === 1 &&
                                    <ProductionCont>
                                        {result.production_countries && (
                                            <CountryCont>
                                                <CountryTitle>Contries</CountryTitle>
                                                <CountryWrap>
                                                    {result.production_countries.map(item => (
                                                        <CountryItem key={item.iso_3166_1}>
                                                            <CountryName>
                                                                {item.iso_3166_1 === "US" && <span role="img" aria-label="US flag" style={{ fontSize: "60px" }}>🇺🇸</span>}
                                                                {item.iso_3166_1 === "CA" && <span role="img" aria-label="Canada flag" style={{ fontSize: "60px" }}>🇨🇦</span>}
                                                                {item.iso_3166_1 === "JP" && <span role="img" aria-label="Japan flag" style={{ fontSize: "60px" }}>🇯🇵</span>}
                                                            </CountryName>
                                                        </CountryItem>
                                                    ))}
                                                </CountryWrap>
                                            </CountryCont>
                                        )}
                                        {result.production_companies && (
                                            <CompanyCont>
                                                <CompanyTitle>Companies</CompanyTitle>
                                                <CompanyWrap>
                                                    {result.production_companies.map(item => (
                                                        <CompanyItem key={item.id}>
                                                            <CompanyImage
                                                                bgUrl={
                                                                    item.logo_path
                                                                        ? `https://image.tmdb.org/t/p/w300${item.logo_path}`
                                                                        : noLogoImg
                                                                }
                                                            />
                                                            <CompanyName>{item.name}</CompanyName>

                                                        </CompanyItem>
                                                    ))}
                                                </CompanyWrap>
                                            </CompanyCont>
                                        )}
                                    </ProductionCont>
                                }
                                {tabIndex === 2 &&
                                    <SeasonCont>
                                        <SeasonWrap>
                                            {result.seasons.map(item => (
                                                <SeasonItem key={item.id}>
                                                    <SeasonPosterImage
                                                        bgUrl={
                                                            item.poster_path
                                                                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                                                                : noLogoImg
                                                        }
                                                    />
                                                    <SeasonName>
                                                        {item.name}{" "}({item.episode_count})
                                                    </SeasonName>
                                                    <SeasonDate>

                                                    </SeasonDate>
                                                    {item.air_data}
                                                </SeasonItem>
                                            ))}

                                        </SeasonWrap>
                                    </SeasonCont>
                                }
                            </TabDetail>
                        </ExtraInfoContainer>
                    </Data>
                </Content>

            </Container>
        );
    /* eslint-enable*/
}
