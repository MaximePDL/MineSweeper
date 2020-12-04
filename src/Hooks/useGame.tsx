import React, { useEffect, useReducer } from 'react';
import { Vibration } from 'react-native';
import { Case, Label } from '../Components/Case/Case.types';
import { EndGame, State } from '../Components/Grid/Grid.types';
import { GameSettings, useGameArgs } from '../Containers/Game/Game.types';

const createGameMatrix = (
    width: number,
    height: number,
    mines: number
): number[][] => {
    var gameMatrix = Array(height);
    for (var i = 0; i < height; i++) {
        gameMatrix[i] = new Array(width).fill(0);
    }
    var minesAdded = 0;
    while (minesAdded < mines) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        if (gameMatrix[y][x] !== -1) {
            gameMatrix[y][x] = -1;
            minesAdded++;
            gameMatrix = updateNumbersInMatrix(gameMatrix, x, y, width, height);
        }
    }
    return gameMatrix;
};

const updateNumbersInMatrix = (
    gameMatrix: number[][],
    x: number,
    y: number,
    width: number,
    height: number
): number[][] => {
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
        if (y < height - 1) {
            if (matrix[y + 1][x - 1] !== -1) {
                matrix[y + 1][x - 1]++;
            }
        }
    }
    if (x < width - 1) {
        if (matrix[y][x + 1] !== -1) {
            matrix[y][x + 1]++;
        }
        if (y > 0) {
            if (matrix[y - 1][x + 1] !== -1) {
                matrix[y - 1][x + 1]++;
            }
        }
        if (y < height - 1) {
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
    if (y < height - 1) {
        if (matrix[y + 1][x] !== -1) {
            matrix[y + 1][x]++;
        }
    }
    return matrix;
};

function initGameState(gameSettings: GameSettings): State {
    const gameMatrix: number[][] = createGameMatrix(
        gameSettings.width,
        gameSettings.height,
        gameSettings.mines
    );
    const mat: Case[][] = gameMatrix.map((row) =>
        row.map((elt: number) =>
            Object({
                isMine: elt === -1,
                nearMines: elt,
                revealed: false,
                labeled: Label.None
            })
        )
    );
    const toDiscover: number =
        gameSettings.width * gameSettings.height - gameSettings.mines;
    const toFlag: number = gameSettings.mines;
    return {
        gameMatrix: mat,
        toDiscover: toDiscover,
        toFlag: toFlag,
        endGame: EndGame.NotYet
    };
}

const neighbours = (gameMatrix: Case[][], x: number, y: number): number[][] => {
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
        [x + 1, y + 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
        [x - 1, y - 1]
    ].reduce((acc: number[][], node) => {
        if (typeof gameMatrix[node[1]] !== 'undefined') {
            if (typeof gameMatrix[node[1]][node[0]] !== 'undefined') {
                acc.push([node[0], node[1]]);
                return acc;
            }
        }
        return acc;
    }, []);
};

const reveal = (
    gameMatrix: Case[][],
    toDiscover: number,
    x: number,
    y: number,
    endGame: EndGame
) => {
    if (!gameMatrix[y][x].revealed && gameMatrix[y][x].labeled === Label.None) {
        gameMatrix[y][x].revealed = true;
        switch (gameMatrix[y][x].nearMines) {
            case 0:
                toDiscover--;
                neighbours(gameMatrix, x, y).map((node) => {
                    if (!gameMatrix[node[1]][node[0]].revealed) {
                        var rev = reveal(
                            gameMatrix,
                            toDiscover,
                            node[0],
                            node[1],
                            endGame
                        );
                        gameMatrix = rev.gameMatrix;
                        toDiscover = rev.toDiscover;
                        endGame = rev.endGame;
                    }
                });

                break;
            case -1:
                endGame = EndGame.Lose;
                return { gameMatrix, toDiscover, endGame };
            default:
                toDiscover = toDiscover - 1;
                return { gameMatrix, toDiscover, endGame };
        }
        return { gameMatrix, toDiscover, endGame };
    }
    if (gameMatrix[y][x].revealed) {
        const directNeighbours = neighbours(gameMatrix, x, y);
        const flagNumber = directNeighbours.reduce(
            (acc, elt) =>
                acc +
                (gameMatrix[elt[1]][elt[0]].labeled === Label.Flag ? 1 : 0),
            0
        );
        if (flagNumber === gameMatrix[y][x].nearMines) {
            directNeighbours.map((node) => {
                if (!gameMatrix[node[1]][node[0]].revealed) {
                    var rev = reveal(
                        gameMatrix,
                        toDiscover,
                        node[0],
                        node[1],
                        endGame
                    );
                    gameMatrix = rev.gameMatrix;
                    toDiscover = rev.toDiscover;
                    endGame = rev.endGame;
                }
            });
        }
        return { gameMatrix, toDiscover, endGame };
    }
    return { gameMatrix, toDiscover, endGame };
};

const label = (gameMatrix: Case[][], toFlag: number, x: number, y: number) => {
    switch (gameMatrix[y][x].labeled) {
        case Label.None:
            gameMatrix[y][x].labeled = Label.Flag;
            toFlag = toFlag + 1;
            break;
        case Label.Flag:
            gameMatrix[y][x].labeled = Label.Question;
            toFlag = toFlag - 1;
            break;
        case Label.Question:
            gameMatrix[y][x].labeled = Label.None;
            break;
    }
    Vibration.vibrate(100);
    return { gameMatrix, toFlag };
};

const reducer = (state: State, action: { type: any; payload: any }): State => {
    if (state.endGame === EndGame.NotYet) {
        switch (action.type) {
            case 'reveal':
                var gameMatrix = state.gameMatrix.slice();
                var toDiscover = state.toDiscover;
                var endGame = state.endGame;
                var rev = reveal(
                    gameMatrix,
                    toDiscover,
                    action.payload.x,
                    action.payload.y,
                    endGame
                );
                gameMatrix = rev.gameMatrix;
                toDiscover = rev.toDiscover;
                const newEndGame = rev.endGame;

                return {
                    gameMatrix: gameMatrix,
                    toDiscover: toDiscover,
                    toFlag: state.toFlag,
                    endGame: newEndGame
                };
            case 'label':
                var gameMatrix = state.gameMatrix.slice();
                var toFlag = state.toFlag;
                var lab = label(
                    gameMatrix,
                    toFlag,
                    action.payload.x,
                    action.payload.y
                );
                gameMatrix = lab.gameMatrix;
                toFlag = lab.toFlag;
                return {
                    gameMatrix: gameMatrix,
                    toDiscover: state.toDiscover,
                    toFlag: toFlag,
                    endGame: state.endGame
                };
        }
    }
    return state;
};

export default (args: useGameArgs) => {
    //Initialisation du state
    const [state, dispatch] = useReducer(
        reducer,
        args.gameSettings,
        initGameState
    );

    useEffect(() => {
        if (state.toDiscover === 0) {
            args.handleEndGame(EndGame.Win);
        }
        if (state.endGame === EndGame.Lose) {
            args.handleEndGame(EndGame.Lose);
        }
    }, [state.toDiscover, state.endGame]);

    return { state: state, dispatch: dispatch };
};
