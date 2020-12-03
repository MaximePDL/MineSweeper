import { Case } from '../Case/Case.types';

export interface RowProps {
    row: Case[];
    rowId: number;
    dispatch: Function;
}
