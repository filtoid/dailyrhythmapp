import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_todos';
const ARCHIVE_KEY = 'archive_todos';

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

export const getStoredArchive = async () => {
    try {
        const rawjson = await AsyncStorage.getItem(ARCHIVE_KEY);
        const storedVals = JSON.parse(rawjson);
        
        if(storedVals == null || storedVals.archives == undefined || storedVals.archives == null){
            // We have no stored values
            return null;
        }
        return storedVals.archives;

    } catch (e) {
        console.error(e);
        console.log("Failed to load archive");
        return null;
    }
}

export const saveStoredArchive = async(vals) => {
    try {
        let storageVal = {
            "archives": vals
        };
        await AsyncStorage.setItem(ARCHIVE_KEY, JSON.stringify(storageVal))
    } catch (e) {
        console.error(e);
        console.log('Failed to save the data to the storage')
    }
}

export const StoreArchiveData = (key, date, value) => {
    getStoredArchive().then((archive) => {
        if(archive === null){
            archive = {};
        }
        if(archive[key] === undefined){
            archive[key] = [];
        }
        archive[key].push({
            date: date,
            value: value
        })
        saveStoredArchive(archive);
    })
}
export const GetCurrentDateId = () => {
    let d = new Date(); 
    let m = "" + d.getUTCMonth();
    if(m.length < 2){
        m = "0" + m;
    }
    let dy = "" + d.getDate();
    if(dy.length < 2){
        dy = "0" + dy;
    }
    return "" + d.getFullYear() + m + dy;
}