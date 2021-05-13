import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import {HeaderBar} from '../components';

import {icons, SIZES, COLORS, FONTS} from '../constants';

const Place = ({navigation, route}) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    console.log('Place ===> selectedPlace', selectedPlace);

    useEffect(() => {
        let {selectedPlace} = route.params;
        setSelectedPlace(selectedPlace);
    }, []);

    function renderPlace() {
        return (
            <ImageBackground
                source={selectedPlace?.image}
                style={{
                    width: '100%',
                    height: '100%',
                }}>
                <HeaderBar
                    title=""
                    leftOnPressed={() => navigation.goBack()}
                    right={false}
                    containerStyle={{
                        marginTop: SIZES.padding * 2,
                    }}
                />
            </ImageBackground>
        );
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {renderPlace()}
        </View>
    );
};

export default Place;
