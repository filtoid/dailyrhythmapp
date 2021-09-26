// import { useParams } from "react-router"
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import ComponentContainer from "./StyledComponents/ComponentContainer";
// import ListContainer from "./StyledComponents/ListContainer";

export default function IndividualTodo(navigation){

    const { index, item } = navigation.route.params;
    // console.log(item);
    return (
        <ComponentContainer>
            <ListContainer>
                <TextItem>{item.name}</TextItem>
                <TextItem>{item.description}</TextItem>
                <TextItem>{item.time}</TextItem>
                <IconContainer onPress={() => deleteItem(item.key)}>
-                   <MaterialIcons name="delete" size={24} color="black" />
                </IconContainer>
            </ListContainer>
        </ComponentContainer>
    )
}



const ListContainer = styled.View`
    margin-top: 20px;
    background-color: whitesmoke;
    height: auto;
    width: 350px;
    margin-bottom: 30px;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`;

const TextItem = styled.View`
    color: black;
    width: 350px;
    height: auto;
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left:20px;
    font-family: arial;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-top: 0px;
  height: 40px;
  border-radius: 10px;
`;