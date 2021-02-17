import React from "react";
import styled from "styled-components";

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

const TabVideo = ({ results }) => {
    return (
        <VideoWrap>
            {results && results.map(
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
            }
            {results.length < 1 && "There are no video clips!"}
        </VideoWrap>
    )
}
export default TabVideo;