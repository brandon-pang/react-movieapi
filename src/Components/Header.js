import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    
`;
const List = styled.ul`
    display:flex;
    &:hover{
        background-color: blue;
    }
`;
const ListItem = styled.li`
`;
const ListLink = styled(Link)`
`;

// eslint-disable-next-line
export default () => (
    <Header>
        <List>
            <ListItem>
                <ListLink to="/">Movies</ListLink>
            </ListItem>
            <ListItem>
                <ListLink to="/tv">TV</ListLink>
            </ListItem>
            <ListItem>
                <ListLink to="/search">Search</ListLink>
            </ListItem>
        </List>
    </Header>
);