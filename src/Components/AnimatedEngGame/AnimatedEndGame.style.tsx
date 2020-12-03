import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export default StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    mainContainer: {
        position: 'absolute',
        borderRadius: 20,
        zIndex: 1000,
        aspectRatio: 1.4,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});
