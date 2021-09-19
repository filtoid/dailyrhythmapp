import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_todos';

export const GetStoredData = async () => {
    try {
        const rawjson = await AsyncStorage.getItem(STORAGE_KEY);
        const storedVals = JSON.parse(rawjson);
        
        if(storedVals == null || storedVals.todos == undefined || storedVals.todos == null){
            // We have no stored values
            return null;
        }
        return storedVals.todos;

    } catch (e) {
        console.error(e);
        console.log("Failed to load data");
        return null;
    }
}

export const SaveStoredData = async(vals) => {
    try {
        let storageVal = {
            "todos": vals
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storageVal))
    } catch (e) {
        console.error(e);
        console.log('Failed to save the data to the storage')
    }
      
}