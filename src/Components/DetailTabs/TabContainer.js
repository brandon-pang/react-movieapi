import React, { useState } from "react";
import styled from "styled-components";
import TabProduct from "./TabProduct";
import TabSeason from "./TabSeason";
import TabVideo from "./TabVideo";

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
                    <TabVideo results={result.videos.results} />
                }
                {tabIndex === 1 &&
                    <TabProduct countries={result.production_countries} companies={result.production_companies} />
                }
                {tabIndex === 2 &&
                    <TabSeason seasons={result.seasons} />
                }
            </TabDetail>
        </ExtraInfoContainer>
    )
}

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

export default TabContainer;