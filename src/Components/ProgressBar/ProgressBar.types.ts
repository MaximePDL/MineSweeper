import { EndGame } from '../Grid/Grid.types';

export interface ProgressProps {
    toFlag: number;
    handleRetry: Function;
    endGame: EndGame;
    toDiscover: number;
    handleChangeSettings: Function;
}
