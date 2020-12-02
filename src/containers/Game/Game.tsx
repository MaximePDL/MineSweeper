import { AnimatedEndGame, Grid } from 'components';
import { GameFinished } from 'constants';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { GameSettings } from 'types';
import styles from './GameStyles';

const createGameMatrix = (props: GameSettings) => {
    var gameMatrix = Array(props.height);
    for (var i = 0; i < props.height; i++) {
        gameMatrix[i] = new Array(props.width).fill(0);
    }
    var mines = 0;
    while (mines < props.mines) {
        const x = Math.floor(Math.random() * props.width);
        const y = Math.floor(Math.random() * props.height);
        if (gameMatrix[y][x] !== -1) {
            gameMatrix[y][x] = -1;
            mines++;
            gameMatrix = updateNumbersInMatrix(gameMatrix, x, y, props);
        }
    }
    return gameMatrix;
};

const updateNumbersInMatrix = (
    gameMatrix: number[][],
    x: number,
    y: number,
    props: GameSettings
) => {
    var matrix = gameMatrix.slice();
    if (x > 0) {
        if (matrix[y][x - 1] !== -1) {
            matrix[y][x - 1]++;
        }
        if (y > 0) {
            if (matrix[y - 1][x - 1] !== -1) {
                matrix[y - 1][x - 1]++;
            }
        }
        if (y < props.height - 1) {
            if (matrix[y + 1][x - 1] !== -1) {
                matrix[y + 1][x - 1]++;
            }
        }
    }
    if (x < props.width - 1) {
        if (matrix[y][x + 1] !== -1) {
            matrix[y][x + 1]++;
        }
        if (y > 0) {
            if (matrix[y - 1][x + 1] !== -1) {
                matrix[y - 1][x + 1]++;
            }
        }
        if (y < props.height - 1) {
            if (matrix[y + 1][x + 1] !== -1) {
                matrix[y + 1][x + 1]++;
            }
        }
    }
    if (y > 0) {
        if (matrix[y - 1][x] !== -1) {
            matrix[y - 1][x]++;
        }
    }
    if (y < props.height - 1) {
        if (matrix[y + 1][x] !== -1) {
            matrix[y + 1][x]++;
        }
    }
    return matrix;
};

export const Game: React.FC<GameSettings> = (props: GameSettings) => {
    const [gameMatrix, setGameMatrix] = useState(() => createGameMatrix(props));
    const [gameEnd, setGameEnd] = useState(false);
    const [gameResult, setGameResult] = useState('lost');
    const [key, setKey] = useState(1);
    const [visible, setVisible] = useState(false);
    const [toDiscover, setToDiscover] = useState(
        props.width * props.height - props.mines
    );

    const win = () => {
        setGameEnd(true);
        setGameResult('won');
    };
    const lose = () => {
        setGameEnd(true);
    };
    const updateProgression = (toReduce: number) => {
        setToDiscover(toDiscover - toReduce);
    };
    const handleRetry = () => {
        setGameMatrix(createGameMatrix(props));
        setGameEnd(false);
        setKey(key + 1);
        setToDiscover(props.width * props.height - props.mines);
    };

    useEffect(() => {
        if (toDiscover === 0) {
            win();
        }
    }, [toDiscover]);
    return (
        <View style={styles.main}>
            <GameFinished.Provider value={gameEnd}>
                <Grid
                    key={key}
                    gameMatrix={gameMatrix}
                    updateProgression={updateProgression}
                    loseFn={lose}
                    handleRetry={handleRetry}
                ></Grid>
                <AnimatedEndGame
                    gameResult={gameResult}
                    handleRetry={handleRetry}
                ></AnimatedEndGame>
            </GameFinished.Provider>
        </View>
    );
};
