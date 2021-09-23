import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";

import AddInput from "./AddInput";
import TodoList from "./TodoList";
import Empty from "./Empty";
import Header from "./Header";

export default function TodoController({data, saveList, deleteItem, submitHandler}) {
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
    )
}

const ComponentContainer = styled.View`
  background-color: #1f1f1f;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;