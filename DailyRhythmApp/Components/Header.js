import React from "react";
import styled from "styled-components/native";

let today = new Date().toISOString().slice(0, 10);

export default function Header() {
  return (
    <ComponentContainer>
      <HeaderText>Daily Rhythm App</HeaderText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 75px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #595959;
  padding:20px;
  border-radius: 5px;
  margin-bottom:20px;
`;

const HeaderText = styled.Text`
  color: white;
  font-family: arial;
  font-size: 25px;
  text-align:center;
  margin-left: auto;
  margin-right:auto;
  margin-top:5px;
`;

const HeaderList = styled.Text`
  color: white;
  font-family: arial
  font-size: 20px;
  margin-right: 20px;
`;