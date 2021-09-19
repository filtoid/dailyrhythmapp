import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import Empty from "./Components/Empty";
import Header from "./Components/Header";

export default function App() {
 const [data, setData] = useState([]);

  const submitHandler = (value, description) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          description: description,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
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

