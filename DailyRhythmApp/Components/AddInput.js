import React, { useState, useReducer } from "react";
import {View, TextInput, Text, TouchableOpacity, Button} from 'react-native'
import styled from "styled-components/native";

export default function AddInput({ submitHandler }) {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const onChangeTaskName = (text) => {
        setTaskName(text);
    };
    const onChangeTaskDescription = (text) => {
        setTaskDescription(text);
    };

  return (
    <TodoContainer>
      <InputContainer>
        <Input placeholder="Name..." onChangeText={onChangeTaskName} value={taskName}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Description..." onChangeText={onChangeTaskDescription} value={taskDescription}/>
      </InputContainer>
      <TodoAddButton
        onPress={() => {
            submitHandler(taskName, taskDescription);
            setTaskName("");
            setTaskDescription("");
        }}
      >
        <Text>Submit</Text>
      </TodoAddButton>
    </TodoContainer>
  );
}

const TodoContainer = styled.View`
  flex-direction: column;
  background-color: #595959;
  padding: 25px;
  border-radius: 5px;
  filter: drop-shadow(4px 6px 4px rgba(200,200,220, 1));
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 350px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  display:block;
  filter: drop-shadow(3px 3px 1px rgba(40,40,40, 1));
`;

const TodoAddButton = styled.TouchableOpacity`
  width: 350px;
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: center;
  align-items: center;
  background-color: #d8d8d8;
  border-radius: 50px;
  filter: drop-shadow(3px 3px 1px rgba(40,40,40, 1));
`;
