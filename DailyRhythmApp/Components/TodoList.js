import React, { useState } from "react";
import { View } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import styled from "styled-components/native";

export default function TodoList({ item, deleteItem }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // const [backgroundColor, setBackgroundColor] = useState();

    const tick = () => {
        if(isRunning){
            setSeconds(seconds + 1);
        }
    }

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    const getFormattedTime = () => {
        let mins = Math.floor(seconds/60);
        let secs = seconds % 60;
        if(seconds < 60){
            return secs + "s";
        }else{
            return mins + "m " + secs + "s";
        }
    }

    const getPlayButton = () => {
        if(!isRunning){
            return <AntDesign name="caretright" size={24} color="black" />;
        }else{
            return <Entypo name="controller-stop" size={24} color="black" />
        }
    }
    const backgroundColor = () => {
        if(!isRunning){
            return {backgroundColor: 'whitesmoke'}
        }else{
            return {backgroundColor: 'green'}
        }
    }
    return (
        <ComponentContainer>
        <ListContainer style={backgroundColor()}>
            <View>
            <TextItem>{item.name}</TextItem>
            <TextItem>{getFormattedTime()}</TextItem>
            </View>
            <IconContainer onPress={() => deleteItem(item.key)}>
            <MaterialIcons name="delete" size={24} color="black" />
            </IconContainer>
            <IconContainer onPress={() => setIsRunning(!isRunning)}>
            {getPlayButton()}
            </IconContainer>
        </ListContainer>
        </ComponentContainer>
    );
}


const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 200px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
  margin-left:20px;
  font-family: arial;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;
  font-family: arial;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-top: 0px;
  height: 40px;
  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 2px;
`;