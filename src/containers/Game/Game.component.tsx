import { AnimatedEndGame, Grid } from 'Components';
import { GameFinished } from 'src/Constants';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { GameSettings } from './Game.types';
import styles from './Game.styles';
import { EndGame } from '../../Components/Grid/Grid.types';

const handleRetry = (
    key: number,
    setKey: Function,
    setGameResult: Function
) => {
    setKey(key + 1);
    setGameResult(EndGame.NotYet);
};

const handleEndGame = (endGame: EndGame, setGameResult: Function) =>
    setGameResult(endGame);

export const Game: React.FC<GameSettings> = (props: GameSettings) => {
    const [gameResult, setGameResult] = useState(EndGame.NotYet);
    const [key, setKey] = useState(1);

    return (
        <View style={styles.main}>
            <Grid
                key={key}
                handleEndGame={(endGame: EndGame) =>
                    handleEndGame(endGame, setGameResult)
                }
                gameSettings={props}
            ></Grid>
            <AnimatedEndGame
                gameResult={gameResult}
                handleRetry={() => handleRetry(key, setKey, setGameResult)}
            ></AnimatedEndGame>
        </View>
    );
};
