import React from "react";
import TodoController from "./Components/TodoController";
import NewTodo from "./Components/NewTodo";
// import { NativeRouter, Route, Link } from "react-router-native";

import IndividualTodo from "./Components/IndividualTodo";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Daily Rhythm App" component={TodoController} />
          {/* <TodoController data={data} saveList={saveList} deleteItem={deleteItem} submitHandler={submitHandler}/> */}
          {/* </Stack.Screen> */}
          <Stack.Screen name="Todo" component={IndividualTodo} />
          <Stack.Screen name="New Todo" component={NewTodo} />
        </Stack.Navigator>
      </NavigationContainer>

    );
}


