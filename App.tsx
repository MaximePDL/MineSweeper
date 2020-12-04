import React from 'react';
import { View } from 'react-native';
import styles from './App.styles';
import { Game } from 'Containers';

export default function App() {
    return (
        <View style={styles.mainContainer}>
            <Game width={15} height={25} mines={30} />
        </View>
    );
}
