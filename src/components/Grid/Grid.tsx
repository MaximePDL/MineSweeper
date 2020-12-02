import React, { useState } from 'react';
import { Vibration, View } from 'react-native';
import { GridProps } from 'types';
import { Case } from '../Case';
import styles from './GridStyles';

export const Grid: React.FC<GridProps> = (props: GridProps) => {
    const initializeProgressionMatrix = () => {
        var mat = Array(props.gameMatrix.length);
        for (var i = 0; i < props.gameMatrix.length; i++) {
            mat[i] = new Array(props.gameMatrix[0].length).fill(false);
        }
        return mat;
    };
    const [progressionMatrix, setProgressionMatrix] = useState(
        initializeProgressionMatrix
    );

    const initializeLabelMatrix = () => {
        var mat = Array(props.gameMatrix.length);
        for (var i = 0; i < props.gameMatrix.length; i++) {
            mat[i] = new Array(props.gameMatrix[0].length).fill('none');
        }
        return mat;
    };
    const [labelMatrix, setLabelMatrix] = useState(initializeLabelMatrix);
    const label = (x: number, y: number) => {
        var mat = labelMatrix.slice();
        switch (labelMatrix[y][x]) {
            case 'none':
                mat[y][x] = 'flag';
                break;
            case 'flag':
                mat[y][x] = 'questionMark';
                break;
            case 'questionMark':
                mat[y][x] = 'none';
                break;
        }
        setLabelMatrix(mat);
        Vibration.vibrate(100);
    };
    const reveal = (x: number, y: number, n: number) => {
        if (!progressionMatrix[y][x]) {
            var mat = progressionMatrix.slice();
            mat[y][x] = true;
            setProgressionMatrix(mat);
            var m = n;
            switch (props.gameMatrix[y][x]) {
                case 0:
                    [
                        [x + 1, y],
                        [x - 1, y],
                        [x, y + 1],
                        [x, y - 1],
                        [x + 1, y + 1],
                        [x - 1, y + 1],
                        [x + 1, y - 1],
                        [x - 1, y - 1]
                    ].map((node) => {
                        if (typeof progressionMatrix[node[1]] !== 'undefined') {
                            if (
                                typeof progressionMatrix[node[1]][node[0]] !==
                                'undefined'
                            ) {
                                if (!progressionMatrix[node[1]][node[0]]) {
                                    m = reveal(node[0], node[1], m + 1);
                                }
                            }
                        }
                    });
                    break;
                case -1:
                    lose();
                    m = 0;
                    return m;
            }
            return m;
        }
        return 0;
    };

    const lose = () => {
        var mat = progressionMatrix.slice();
        for (var i = 0; i < props.gameMatrix.length; i++) {
            for (var j = 0; j < props.gameMatrix[0].length; j++) {
                if (props.gameMatrix[i][j] === -1) {
                    mat[i][j] = true;
                }
            }
        }
        setProgressionMatrix(mat);
        props.loseFn();
    };

    const handleRetry = () => {
        props.handleRetry();
    };

    return (
        <View style={styles['main-container']}>
            {props.gameMatrix.map((row, i) => (
                <View style={styles.row} key={i}>
                    {row.map((elt, j) => (
                        <Case
                            key={i * props.gameMatrix.length + j}
                            id={i * props.gameMatrix.length + j}
                            isMine={elt === -1}
                            nearMines={elt === -1 ? 0 : elt}
                            revealFn={(n: number) => reveal(j, i, n)}
                            revealed={progressionMatrix[i][j]}
                            labelFn={() => label(j, i)}
                            labeled={labelMatrix[i][j]}
                            updateProgression={props.updateProgression}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};
