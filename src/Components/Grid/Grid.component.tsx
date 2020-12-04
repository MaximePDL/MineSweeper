import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { GridProps } from './Grid.types';
import styles from './Grid.styles';
import useGame from '../../Hooks/useGame';
import { Row } from '../Row/Row.component';
import { ProgressBar } from '../ProgressBar/ProgressBar.component';

export const Grid: React.FC<GridProps> = (props: GridProps) => {
    const { state, dispatch } = useGame({
        gameSettings: props.gameSettings,
        handleEndGame: props.handleEndGame,
    });

    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Row rowId={index} dispatch={dispatch} row={item} />
        ),
        [dispatch]
    );

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <ProgressBar
                toFlag={state.toFlag}
                handleRetry={props.handleRetry}
                endGame={state.endGame}
                toDiscover={state.toDiscover}
                handleChangeSettings={props.handleChangeSettings}
            />
            <ScrollView style={styles.mainContainer} horizontal>
                <FlatList
                    data={state.gameMatrix}
                    renderItem={renderItem}
                    keyExtractor={(_item, index) => index.toString()}
                />
            </ScrollView>
        </ScrollView>
    );
};
