import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchList from '../components/SearchList'

function HomeScreen() {
    return (
        <View style={styles.main}>
            <View style={styles.body}>  
                <Text style={styles.title}>Search for a command</Text>
                <SearchList />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "#fff",
        marginTop: 32,
        marginBottom: 8,
        marginLeft: 24
    },
    main: {
        flex: 1
    },
    body: {
        backgroundColor: "#222",
        height: "100%",
    },
    button: {
        width: "50%"
    }
});

export default HomeScreen;
