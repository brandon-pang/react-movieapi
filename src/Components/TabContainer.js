import React, { useState } from "react";
import styled from "styled-components";
import noLogoImg from "../assets/noPosterSmall.png";
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
    min-height: 520px;
    height:100%;
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
    justify-content:flex-start;
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
    margin-top:5px;
    font-size:10px;
    color:#999;
    font-weight:thin;
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
const TabContainer = ({ isMovie, result }) => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
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
                                    item && item.key && (
                                        <VidItem key={item.key}>
                                            <iframe
                                                title="Youtube player"
                                                width="430"
                                                height="240"
                                                src={`https://www.youtube.com/embed/${item.key}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                        </VidItem>
                                    )
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
                                    {console.log(item)}
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
                                        {item.air_date}
                                    </SeasonDate>
                                </SeasonItem>
                            ))}

                        </SeasonWrap>
                    </SeasonCont>
                }
            </TabDetail>
        </ExtraInfoContainer>
    )
}

export default TabContainer;