import React from 'react';
import { View } from 'react-native';
import { Case } from 'components';
import styles from './AppStyles';
import { Game } from 'containers';

export default function App() {
    const liste = [1, 1, 1, 1, 1, 1, 1];
    return (
        <View style={styles['main-container']}>
            <Game width={8} height={8} mines={20} />
        </View>
    );
}
