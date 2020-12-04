export interface GameSettings {
    mines: number;
    width: number;
    height: number;
}
export interface GameProps extends GameSettings {
    handleChangeSettings: Function;
}
export interface useGameArgs {
    gameSettings: GameSettings;
    handleEndGame: Function;
}
