import React from "react";
import styled from "styled-components/native";
import SplashImage from "../assets/adaptive-icon.png";

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyText>Create a task</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 100px;
`;

const EmptyText = styled.Text`
  color: #d4d0d0;
  font-family: arial;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 30px;
`;