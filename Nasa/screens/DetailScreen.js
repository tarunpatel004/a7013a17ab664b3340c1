import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';


const DetailScreen = ({ route, navigation }) => {

    const renderInformation = (title, value) => {

       return <View style={styles.detailRow}>

            <Text style={styles.titleText}>{title}: </Text>
            <Text numberOfLines={2} style={styles.valueText}>{value}</Text>

        </View>

    }
    const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = route.params;

    return (



        <SafeAreaView>
            <View style={styles.mainContainer}>

                {renderInformation('name', name)}
                {renderInformation('nasa_jpl_url', nasa_jpl_url)}
                {renderInformation('is_potentially_hazardous_asteroid', is_potentially_hazardous_asteroid == true ? 'Yes' : 'No')}

            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%', 
        overflow: 'scroll', 
        padding: 10

    },
    detailRow: {
       marginBottom: 20,
      
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    valueText: {
        fontSize: 14,
        marginTop: 6,

    }

});

export default DetailScreen;
