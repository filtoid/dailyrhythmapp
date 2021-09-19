import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import Empty from "./Components/Empty";
import Header from "./Components/Header";

import {GetStoredData, SaveStoredData} from "./StorageService";

export default function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    GetStoredData().then((stored_data) => {
      
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

  return (
      <ComponentContainer>
        <View style={StyleSheet.scrollView}>
          <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem}/>
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

