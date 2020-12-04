import React, { useCallback } from 'react';

import { RowProps } from './Row.types';
import { FlatList } from 'react-native';
import { Case } from '../Case/Case.component';

export const Row: React.FC<RowProps> = (props: RowProps) => {
    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Case
                {...item}
                x={index}
                y={props.rowId}
                dispatch={props.dispatch}
            ></Case>
        ),
        [props.dispatch, props.rowId]
    );

    return (
        <FlatList
            horizontal
            scrollEnabled={false}
            data={props.row}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
                (props.rowId * props.row.length + index).toString()
            }
        ></FlatList>
    );
};
