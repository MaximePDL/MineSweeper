import { Grid } from 'components';
import React from 'react';
import { View } from 'react-native';
import { GameSettings } from 'types';

export const Game: React.FC<GameSettings> = (props: GameSettings) => {
    const createGameMatrix = () => {
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
                gameMatrix = updateNumbersInMatrix(gameMatrix, x, y);
            }
        }
        console.log(gameMatrix);
        return gameMatrix;
    };

    const updateNumbersInMatrix = (
        gameMatrix: number[][],
        x: number,
        y: number
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
    const win = () => {};
    const lose = () => {};

    return (
        <View>
            <Grid gameMatrix={createGameMatrix()}></Grid>
        </View>
    );
};
