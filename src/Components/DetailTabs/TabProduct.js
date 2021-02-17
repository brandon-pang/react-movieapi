import React from "react";
import styled from "styled-components";
import noLogoImg from "../../assets/noPosterSmall.png";

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
const TabProduct = ({ countries, companies }) => {
    return (
        <ProductionCont>
            {countries && (
                <CountryCont>
                    <CountryTitle>Contries</CountryTitle>
                    <CountryWrap>
                        {countries.map(item => (
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
            {companies && (
                <CompanyCont>
                    <CompanyTitle>Companies</CompanyTitle>
                    <CompanyWrap>
                        {companies.map(item => (
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
    )
}
export default TabProduct;