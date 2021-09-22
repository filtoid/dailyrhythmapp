import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import Empty from "./Components/Empty";
import Header from "./Components/Header";
import {GetStoredData, SaveStoredData, GetCurrentDateId, StoreArchiveData} from "./StorageService";

export default function App() {

  const [data, setData] = useState([]);
  const [archive, setArchive] = useState([]);

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

  return (
      <ComponentContainer>
        <View style={StyleSheet.scrollView}>
          <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} saveAll={saveList}/>
            )}
          />
          <View>
            <AddInput submitHandler={submitHandler} />
          </View>
        </View>
        
      </ComponentContainer>
    );
}

const ComponentContainer = styled.View`
  background-color: #1f1f1f;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

