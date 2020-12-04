import React, { useCallback } from 'react';
import { View } from 'react-native';
import styles from './App.styles';
import { Game } from 'Containers';
import { useState } from 'react';

export default function App() {
    const [width, setWidth] = useState(9);
    const [height, setHeight] = useState(9);
    const [mines, setMines] = useState(10);

    const handleChangeSettings = useCallback(
        (w: number, h: number, m: number) => {
            setWidth(w);
            setHeight(h);
            setMines(m);
        },
        []
    );
    return (
        <View style={styles.mainContainer}>
            <Game
                width={width}
                height={height}
                mines={mines}
                handleChangeSettings={handleChangeSettings}
            />
        </View>
    );
}
