import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;
const List = styled.ul`
    display:flex;
`;
const ListItem = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
    background-color:transparent;
    transition: all 0.5s ease-in-out;
    
    &:hover{
        background-color:#252525;
        transition: background-color 0.3s ease-in;
    }
`;
const ListLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// eslint-disable-next-line
export default withRouter(({ location: { pathname } }) => (
    <Header>
        <List>
            <ListItem current={pathname === "/"}>
                <ListLink to="/">Movies</ListLink>
            </ListItem>
            <ListItem current={pathname === "/tv"}>
                <ListLink to="/tv">TV</ListLink>
            </ListItem>
            <ListItem current={pathname === "/search"}>
                <ListLink to="/search">Search</ListLink>
            </ListItem>
        </List>
    </Header>
));