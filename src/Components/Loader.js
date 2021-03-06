import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items:center;
  font-size: 30px;
  margin-top: 20px;
`;
// eslint-disable-next-line
export default () => (
    <Container>
    <span role="img" aria-label="Loading" style={{ fontSize: "32px" }}>⏳</span>
    </Container>
)