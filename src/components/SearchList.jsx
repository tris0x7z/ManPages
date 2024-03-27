import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from '@react-navigation/native';

// TODO: cache results list
//       fix loading spinner
function SearchList() {
    const APIURL = "https://www.mankier.com/api/v2/mans/"
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getResults = async (query) => {
            try {
                const response = await fetch(
                    APIURL + '?q=' + encodeURIComponent(query),
                );
                const json = await response.json()
                setSearchResults(json.results)
                setIsLoading(false)
            } catch (error) {
                console.log("ERROR (SearchList): " + error);
                setIsLoading(false)
            }
        }
        if(searchQuery.length > 1)
            getResults(searchQuery)
    }, [searchQuery])

    return (
        <View>
            <View>
                <SearchBar
                    placeholder='e.g. "who"'
                    onChangeText={(query) => {
                        //setIsLoading(true)
                        setSearchQuery(query)
                    }}
                    darkMode={false}
                    spinnerVisibility={isLoading}
                    style={styles.searchBar}
                />
                <SearchResults resultsArray={searchResults}/>
            </View>
        </View>
    )
}

function SearchResults({resultsArray}) {
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.searchResults}>
            {resultsArray.map((result, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => {
                        console.log(result.name + "." + result.section)
                        navigation.navigate("Details", {
                            page: result.name + "." + result.section
                        })
                    }}>
                        <View style={styles.resultCard}>
                            <Text style={[styles.result, styles.resultName]}>{result.name}</Text>
                            <Text style={[styles.result, styles.resultSection]}>Section {result.section}</Text>
                            <Text style={[styles.result, styles.resultDescription]}>{result.description}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 16,
    },
    searchResults: {
        height: "85%"
    },
    resultCard: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        padding: 8,
        borderBottomWidth: 1,
        borderColor: "#000",
        backgroundColor: "#fff",
        color: "#000",
    },
    result: {
        color: "#000",
    }
  });
  

export default SearchList
