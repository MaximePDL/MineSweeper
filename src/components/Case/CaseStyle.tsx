import React from 'react';
import { StyleSheet } from 'react-native';

const width = 30;

export default StyleSheet.create({
    'case-container': {
        width: width,
        height: width,
        backgroundColor: '#CECECE'
    },
    'case-revealed': {
        width: width,
        height: width,
        backgroundColor: '#CECECE',
        borderWidth: 0.5,
        borderColor: '#A9A9A9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'case-revealed-lose': {
        width: width,
        height: width,
        backgroundColor: 'red',
        borderWidth: 0.5,
        borderColor: '#A9A9A9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numbers: {
        fontSize: 0.8 * width
    },
    'image-case': {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    'image-flag': {
        position: 'absolute',
        margin: '20%',
        width: '60%',
        height: '60%'
    }
});
