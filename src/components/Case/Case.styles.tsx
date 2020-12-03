import React from 'react';
import { StyleSheet } from 'react-native';

const width = 30;

export default StyleSheet.create({
    caseContainer: {
        width: width,
        height: width,
        backgroundColor: '#CECECE'
    },
    caseRevealed: {
        width: width,
        height: width,
        backgroundColor: '#CECECE',
        borderWidth: 0.5,
        borderColor: '#A9A9A9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    caseRevealedLose: {
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
    imageCase: {
        width: width,
        height: width
    },
    imageFlag: {
        width: 0.6 * width,
        height: 0.6 * width,
        margin: '20%',
        position: 'absolute'
    }
});
