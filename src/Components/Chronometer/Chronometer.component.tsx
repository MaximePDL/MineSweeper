import React from 'react';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { EndGame } from '../Grid/Grid.types';
import styles from './Chronometer.styles';
import { ChronoProps } from './Chronometer.types';

const Chronometer = ({ endGame, toDiscover }: ChronoProps) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (endGame === EndGame.NotYet && toDiscover > 0) {
            setTimeout(() => setTime(time + 0.1), 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);
    return <Text style={styles.text}>{time.toFixed(1)}</Text>;
};

export default Chronometer;
