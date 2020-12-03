import React from 'react';
import { View } from 'react-native';
import styles from './App.styles';
import { Game } from 'Containers';

export default function App() {
    return (
        <View style={styles.mainContainer}>
            <Game width={9} height={9} mines={10} />
        </View>
    );
}
