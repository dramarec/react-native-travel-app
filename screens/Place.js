import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import {HeaderBar, TextIconButton} from '../components';

import {icons, SIZES, COLORS, FONTS} from '../constants';

const Place = ({navigation, route}) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    console.log('Place ===> selectedPlace', selectedPlace);

    let _panel = useRef(null);

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
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        justifyContent: 'flex-end',
                        marginBottom: 100,
                    }}>
                    {/* Name && Raitings */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{color: COLORS.white, ...FONTS.largeTitle}}>
                            {selectedPlace?.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    marginRight: 5,
                                    color: COLORS.white,
                                    ...FONTS.h3,
                                }}>
                                {selectedPlace?.rate}
                            </Text>
                            <Image
                                source={icons.star}
                                style={{width: 20, height: 20}}
                            />
                        </View>
                    </View>
                    {/* Description */}
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}>
                        {selectedPlace?.description}
                    </Text>
                    {/* Text Icon Button */}
                    <TextIconButton
                        label="Book a flight"
                        icon={icons.aeroplane}
                        customContainerStyle={{
                            marginTop: SIZES.padding,
                        }}
                        onPress={() => console.log('Book a flight')}
                    />
                </View>
            </ImageBackground>
        );
    }

    function renderMap() {
        return (
            <SlidingUpPanel
                ref={c => (_panel = c)}
                draggableRange={{
                    top: SIZES.height + 120,
                    bottom: 120,
                }}
                showBackdrop={false}
                snappingPoints={[SIZES.height + 120]}
                height={SIZES.height + 120}
                friction={0.7}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}>
                    {/* Panel Header */}
                    <View
                        style={{
                            height: 120,
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            source={icons.up_arrow}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white,
                            }}
                        />
                        <Text style={{color: COLORS.white, ...FONTS.h3}}>
                            SWIP FOR DETAILS
                        </Text>
                    </View>

                    {/* Panel Detail */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}></View>
                </View>
            </SlidingUpPanel>
        );
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {renderPlace()}
            {renderMap()}
        </View>
    );
};

export default Place;
