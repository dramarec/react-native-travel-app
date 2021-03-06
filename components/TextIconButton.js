import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';

import {COLORS, SIZES, FONTS} from '../constants';

const TextIconButton = ({
    customContainerStyle,
    customLabelStyle,
    onPress,
    label,
    icon,
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle,
            }}
            onPress={onPress}>
            <Text
                style={{
                    marginRight: SIZES.base,
                    ...FONTS.h2,
                    ...customLabelStyle,
                }}>
                {label}
            </Text>

            <Image
                source={icon}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        </TouchableOpacity>
    );
};

export default TextIconButton;
