import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import ComponentContainer from "./StyledComponents/ComponentContainer";

export default function IndividualTodo(navigation){

    const { index, item, deleteItem } = navigation.route.params;
    const [ showDelete, setShowDelete] = useState(false);

    const getFormattedTime = () => {
        let mins = Math.floor(item.time/60);
        let secs = item.time % 60;
        if(item.time < 60){
            return secs + "s";
        }else{
            return mins + "m " + secs + "s";
        }
    }
  
    const getConfirmationDelete = () => {
        if(showDelete){
            return (
                <ConfirmationBox>
                    <TextItem>Confirm Delete?</TextItem>
                    <ConfirmationButton onPress={() => {
                        deleteItem(item.key);
                        navigation.navigation.goBack();
                    }}>
                        <TextItemCenter>Yes</TextItemCenter>
                    </ConfirmationButton>
                    <ConfirmationButton onPress={() => {
                        setShowDelete(false);
                    }}>
                        <TextItemCenter>No</TextItemCenter>
                    </ConfirmationButton>
                </ConfirmationBox>
            )
        }else{
            return (
                <IconContainer onPress={() => {
                    setShowDelete(true);
                }}>
                    <MaterialIcons name="delete" size={24} color="black" />
                </IconContainer>
            )
        }
    
    }

    return (
        <ComponentContainer>
            <ListContainer>
                <TextItem>{item.name}</TextItem>
                <TextItem>{item.description}</TextItem>
                <TextItem>{getFormattedTime()}</TextItem>
                {getConfirmationDelete()}
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

const TextItem = styled.Text`
    color: black;
    width: 350px;
    height: auto;
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left:20px;
    font-family: arial;
`;
const TextItemCenter = styled.Text`
    color: black;
    width: 250px;
    height: auto;
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left:20px;
    font-family: arial;
    text-align:center;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-top: 0px;
  height: 40px;
  border-radius: 10px;
`;

const ConfirmationBox = styled.Text`
    background-color: #e0e0e0;
`

const ConfirmationButton = styled.TouchableOpacity`
  font-family:arial;
  width: 250px;
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  background-color: #d8d8d8;
  border-radius: 50px;
  filter: drop-shadow(3px 3px 1px rgba(40,40,40, 1));
`;