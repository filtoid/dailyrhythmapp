import React from "react";
import styled from "styled-components/native";
import SplashImage from "../assets/adaptive-icon.png";

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyImage
        source={SplashImage}
      />
      <EmptyText>Create a task</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  min-height: 450px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 100px;
`;

const EmptyText = styled.Text`
  color: white;
  font-family: arial;
  margin-top: 30px;
  font-size: 30px;
`;