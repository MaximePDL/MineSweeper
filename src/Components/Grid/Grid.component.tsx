import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { GridProps } from './Grid.types';
import styles from './Grid.styles';
import useGame from '../../Hooks/useGame';
import { Row } from '../Row/Row.component';

export const Grid: React.FC<GridProps> = (props: GridProps) => {
    const game = useGame({
        gameSettings: props.gameSettings,
        handleEndGame: props.handleEndGame
    });

    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Row rowId={index} dispatch={game.dispatch} row={item}></Row>
        ),
        [game.dispatch]
    );

    return (
        <ScrollView style={styles.mainContainer} horizontal>
            <FlatList
                data={game.state.gameMatrix}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </ScrollView>
    );
};
