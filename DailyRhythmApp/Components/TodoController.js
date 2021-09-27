import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import {GetStoredData, SaveStoredData, GetCurrentDateId, StoreArchiveData} from "../StorageService";
import styled from "styled-components/native";
import TodoList from "./TodoList";
import Empty from "./Empty";

import ComponentContainer from "./StyledComponents/ComponentContainer";

export default function TodoController(navigation) {
   
  const [data, setData] = useState([]);
 
  useEffect(() => {
    GetStoredData().then((stored_data) => {
      let curDate = GetCurrentDateId();
      for(let i=0;stored_data!==null && i<stored_data.length;i++){
        let d = stored_data[i];
        if(d.curDate != curDate){
          // Store the old archived value
          StoreArchiveData(d.key, d.curDate, d.time);
          // Reset the new date
          stored_data[i].curDate = curDate;
          stored_data[i].time = 0;
        }
      }
      if(stored_data != null){
        setData(stored_data);
      }
    });
  }, [])

  const deleteItem = (key) => {
    setData((prevTodo) => {
      let ret = prevTodo.filter((todo) => todo.key != key);
      SaveStoredData(ret);
      return ret;
    });
  };

  const saveList = (key, newTime) => {
    let bFound = false
    for(let i=0;!bFound && i<data.length;i++){
      if(data[i].key === key){
        data[i].time = newTime;
        bFound = true;
      }
    }
    if(!bFound){
      console.log("Failed to find key " + key );
      return;
    }
    setData(data);
    SaveStoredData(data);
  }

  const submitHandler = (value, description) => {
    setData((prevTodo) => {
      let ret = [
        {
          name: value,
          description: description,
          key: Math.random().toString(),
          time: 0,
          curDate: GetCurrentDateId()
        },
        ...prevTodo,
      ];
      SaveStoredData(ret);
      return ret;
    });
  };

  return (
    <ComponentContainer>
      <View style={StyleSheet.scrollView}>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <TodoList item={item} index={index} deleteItem={deleteItem} saveAll={saveList} navigation={navigation} />
          )}
        />
        <View>
          <NewAddButton onPress={() => {
                navigation.navigation.navigate('New Todo', {submitHandler: submitHandler})
            }}><TextItem>New</TextItem></NewAddButton>
        </View>
      </View>
    </ComponentContainer>
  )
}

const NewAddButton = styled.TouchableOpacity`
  font-family:arial;
  width: 350px;
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

const TextItem = styled.Text`
    color: black;
    width: 350px;
    height: auto;
    text-align:center;
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left:20px;
    font-family: arial;
`;