import React from 'react';
import { View } from 'react-native';
import styles from './AppStyles';
import { Game } from 'containers';

export default function App() {
    return (
        <View style={styles['main-container']}>
            <Game width={9} height={9} mines={10} />
        </View>
    );
}
