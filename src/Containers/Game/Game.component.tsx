import { AnimatedEndGame, Grid } from 'Components';
import React, { useState } from 'react';
import { View } from 'react-native';
import { GameProps } from './Game.types';
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

export const Game: React.FC<GameProps> = (props: GameProps) => {
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
                handleRetry={() => handleRetry(key, setKey, setGameResult)}
                handleChangeSettings={props.handleChangeSettings}
            />
            <AnimatedEndGame
                gameResult={gameResult}
                handleRetry={() => handleRetry(key, setKey, setGameResult)}
            />
        </View>
    );
};
