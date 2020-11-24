import React from 'react';
import { View } from 'react-native';
import { Case } from 'components';
import styles from './AppStyles';

export default function App() {
    const liste = [1, 1, 1, 1, 1, 1, 1];
    return (
        <View style={styles['main-container']}>
            {liste.map((d, i) => (
                <Case key={i} isMine={true} nearMines={8} />
            ))}
        </View>
    );
}
