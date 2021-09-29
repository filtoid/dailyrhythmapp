import AddInput from "./AddInput";
import styled from "styled-components/native";
import React from "react";

export default function NewTodo(navigation){
    const returnCall = () => {
        navigation.navigation.goBack();
    }
    const { submitHandler } = navigation.route.params;
    return (
        <AddInputContainer>
            <AddInput submitHandler={submitHandler} returnCall={returnCall} />
        </AddInputContainer>
    )
}

const AddInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;