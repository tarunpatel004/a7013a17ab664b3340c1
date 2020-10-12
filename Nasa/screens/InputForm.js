import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Button,
    StatusBar,
    ActivityIndicator
} from 'react-native';


const InputForm = ({ navigation }) => {

    const [asteroidID, setAsteroidID] = useState('');
    const [isLoading, setLoading] = useState(false);

    /**
     * Submit button pressed or clicked 
     */
    const onSubmitPress = async () => {
        if (asteroidID.trim() === '') {
            alert('AsteroidID can not be blank');
            return
        }
        let response = await getAsteroidInfo(asteroidID)
        setLoading(false)
        if (response) {

            navigation.navigate('DetailScreen', {
                name: response.name,
                nasa_jpl_url: response.nasa_jpl_url,
                is_potentially_hazardous_asteroid: response.is_potentially_hazardous_asteroid

            })

            navigation.navigate('DetailScreen')
        } else {
            alert('Something went wrong, Please check AsteroidID')
        }
        console.log('response ===>>>', response)
    }

    /**
     * Random button clicked/pressed
     */
    const onGetRandomPress = async () => {

        let response = await getAsteroidIds(asteroidID)
        setLoading(false)

        if (response && response.near_earth_objects) {
            let listOfEarthObjects = response.near_earth_objects;
            let size = listOfEarthObjects.length;
            console.log('Size ===', size)
            let RandomNumber = Math.floor(Math.random() * (listOfEarthObjects.length)) + 1;

            let earchObject = listOfEarthObjects[RandomNumber];
            console.log('earchObject ===>>>', earchObject)

            navigation.navigate('DetailScreen', {

                name: earchObject.name,
                nasa_jpl_url: earchObject.nasa_jpl_url,
                is_potentially_hazardous_asteroid: earchObject.is_potentially_hazardous_asteroid

            })

        } else {
            alert('Something went wrong')
        }

    }

    /**
     * getAsteroidInfo from the ID added by the user => It will be an integer id
     * kept max length as a 7 because in the API i get every id in 7 digit
     * @param {*} id 
     */
    const getAsteroidInfo = async (id) => {
        setLoading(true)
        let finalUrl = 'https://api.nasa.gov/neo/rest/v1/neo/' + id + '?api_key=YcbwzE5kGdBWoKJcvc61FoGt98Igr824s8wgXWPE'
        console.log('getAsteroidInfo ', finalUrl)
        try {
            const response = await fetch(finalUrl);
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.log("This is the error ", error);
        }
    };

    /**
     * Find the asteroid id api call 
     */
    const getAsteroidIds = async () => {
        setLoading(true)
        let finalUrl = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY'
        console.log('getAsteroidIds ', finalUrl)
        try {
            const response = await fetch(finalUrl);
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.log("This is the error ", error);
        }
    };


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.mainContainer}>

                    {isLoading ? <ActivityIndicator animating={true} /> : <View>

                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='number-pad'
                            maxLength={7}
                            onChangeText={(text) => setAsteroidID(text)}
                            value={asteroidID}
                            placeholder='Enter Asteroid ID`'></TextInput>

                        <Button title='Submit' onPress={() => onSubmitPress()}></Button>
                        <Button title='Get Random ID' onPress={() => onGetRandomPress()}></Button>

                    </View>}


                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        justifyContent: 'center',

    },
    inputStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 10,
        padding: 10,
        width: 240,
        alignSelf: 'center',
        textAlign: 'center'
    }

});

export default InputForm;
