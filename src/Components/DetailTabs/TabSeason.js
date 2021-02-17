import React from "react";
import styled from "styled-components";
import noLogoImg from "../../assets/noPosterSmall.png";
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
const TabSeason = ({ seasons }) => {
    return (
        <SeasonCont>
            <SeasonWrap>
                {seasons.map(item => (
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
                            {item.air_date}
                        </SeasonDate>
                    </SeasonItem>
                ))}
            </SeasonWrap>
        </SeasonCont>
    )
}
export default TabSeason;