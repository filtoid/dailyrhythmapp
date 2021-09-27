import React, { useState } from "react";
import { View } from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { GetCurrentDateId } from "../StorageService";

import styled from "styled-components/native";

const SAVE_TIMEOUT = 10;

export default function TodoList({ item, index, deleteItem, saveAll, navigation }) {
    const [seconds, setSeconds] = useState(item.time);
    const [isRunning, setIsRunning] = useState(false);
    const [lastSaved, setLastSaved] = useState(0);

    let d = GetCurrentDateId();
    const [curDate, ] = useState(d);

    const tick = () => {
        if(isRunning){
            setSeconds(seconds + 1);
            if(lastSaved > SAVE_TIMEOUT){
                saveAll(item.key, seconds);
                setLastSaved(0);
            }else{
                setLastSaved(lastSaved + 1);
            }
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

    const toggleRunning = () => {
        setIsRunning(!isRunning);
        saveAll(item.key, seconds);
    }

    return (
        <ComponentContainer>
        <ListContainer style={backgroundColor()}>
            <View>
            <TextItem>{item.name}</TextItem>
            <TextItem>{getFormattedTime()}</TextItem>
            </View>
            <IconContainer onPress={() => {
                navigation.navigation.navigate('Todo', { index: index, item:item, deleteItem: deleteItem })
            }}>
            <Ionicons name="ios-open-sharp" size={24} color="black" />
            </IconContainer>
            <IconContainer onPress={() => toggleRunning()}>
            {getPlayButton()}
            </IconContainer>
        </ListContainer>
        </ComponentContainer>
    );
}


const ListContainer = styled.View`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 10px;
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
  margin-top: 10px;
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