import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

// command endpoint returns a list of sections
// cat html from each section's endpoint and render as given
// TODO: filter links to other man pages
//       cache rendered page

function DetailsScreen({route}) {
    const APIURL = "https://www.mankier.com/api/v2/mans/"
    const page = route.params.page
    const { width } = useWindowDimensions();
    const sectionMap = new Map();
    sectionMap.set("Synopsis", 0)
    sectionMap.set("Examples_(TL;DR)", 1)
    sectionMap.set("Description", 2)
    sectionMap.set("Author", 3)
    sectionMap.set("Reporting_Bugs", 4)
    sectionMap.set("Copyright", 5)
    sectionMap.set("See_Also", 6)
    sectionMap.set("Referenced_By", 7)

    const [sections, setSections] = useState([])
    const [html, setHtml] = useState(["<p>Loading</p>"])
    
    useEffect(() => {
        const getSections = async () => {
            try {
                const response = await fetch(APIURL + page);
                const json = await response.json()
                setSections(json.sections)
            } catch (error) {
                console.log("Error: " + error);
            }
        }
        getSections()
    }, [])

    useEffect(() => {
        var promises = sections.map(section => fetch(APIURL + page + '/sections/' + section.id).then(r => r.json()));
        Promise.all(promises).then(results => {
            let fullHtml = []
            results.map(r => {
                fullHtml[sectionMap.get(r.id)] = r.html
            })
            setHtml(fullHtml)
        }).catch(error => {
            console.log("Error: " + error)
        });
    }, [sections])

    const source = {
        html: html.join('') + "<br><br>"
    }
    return (
        <ScrollView style={styles.main}>
            <RenderHtml
                contentWidth={width}
                source={source}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 16,
    }
});

export default DetailsScreen;
