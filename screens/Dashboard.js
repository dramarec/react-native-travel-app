import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Platform,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import {dummyData, icons, images, SIZES, COLORS, FONTS} from '../constants';

const COUNTRIES_ITEM_SIZE = SIZES.width / 3;

const Dashboard = ({navigation}) => {
    const countryScrollX = useRef(new Animated.Value(0)).current;

    const [countries, setCountries] = useState([
        {id: -1},
        ...dummyData.countries,
        {id: -2},
    ]);

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    alignItems: 'center',
                }}>
                {/* {Side Drawer} */}
                <TouchableOpacity
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => console.log('Side Drawer')}>
                    <Image
                        source={icons.side_drawer}
                        resizeMode="contain"
                        style={{withe: 25, height: 25, tintColor: COLORS.white}}
                    />
                </TouchableOpacity>
                {/* {Label Title} */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{color: COLORS.white, ...FONTS}}>ASIA</Text>
                </View>
                {/* {Profiler} */}
                <TouchableOpacity onPress={() => console.log('Profiler')}>
                    <Image
                        source={images.profile_pic}
                        resizeMode="contain"
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderCountries() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToAlignment={COUNTRIES_ITEM_SIZE}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                data={countries}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: countryScrollX,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: false},
                )}
                renderItem={({item, index}) => {
                    const opacity = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    const mapSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [25, Platform.OS === 'ios' ? 80 : 60, 25],
                        extrapolate: 'clamp',
                    });

                    const fontSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [15, 25, 15],
                        extrapolate: 'clamp',
                    });

                    if (index === 0 || index === countries.length - 1) {
                        return (
                            <View style={{width: COUNTRIES_ITEM_SIZE}}></View>
                        );
                    } else {
                        return (
                            <Animated.View
                                opacity={opacity}
                                style={{
                                    height: 130,
                                    width: COUNTRIES_ITEM_SIZE,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Animated.Image
                                    source={item.image}
                                    resizeMode="contain"
                                    style={{
                                        width: mapSize,
                                        height: mapSize,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </Animated.View>
                            // <View>
                            //     <Text style={{color: COLORS.white}}>
                            //         {item.name}
                            //     </Text>
                            // </View>
                        );
                    }
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
                }}>
                <View style={{height: 700}}>
                    {/* Countries */}
                    <View>{renderCountries()}</View>
                    {/* Places */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;
