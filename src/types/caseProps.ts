export interface CaseProps {
    id: number;
    isMine: boolean;
    nearMines: number;
    revealFn: Function;
    revealed: boolean;
    labelFn: Function;
    labeled: string;
    updateProgression: Function;
}
