import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
        initializeProgressionMatrix()
    );

    const reveal = (x: number, y: number) => {
        if (!progressionMatrix[y][x]) {
            var mat = progressionMatrix.slice();
            mat[y][x] = true;
            setProgressionMatrix(mat);
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
                            console.log(node[0], node[1]);
                            if (
                                typeof progressionMatrix[node[1]][node[0]] !==
                                'undefined'
                            ) {
                                console.log(node[0], node[1]);
                                reveal(node[0], node[1]);
                            }
                        }
                    });
                    break;
                case -1:
                    console.log('TODO');
            }
        }
    };

    return (
        <View style={styles['main-container']}>
            {props.gameMatrix.map((row, i) => (
                <View style={styles.row} key={i}>
                    {row.map((elt, j) => (
                        <Case
                            key={i * props.gameMatrix.length + j}
                            isMine={elt === -1}
                            nearMines={elt === -1 ? 0 : elt}
                            revealFn={() => reveal(j, i)}
                            revealed={progressionMatrix[i][j]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};
