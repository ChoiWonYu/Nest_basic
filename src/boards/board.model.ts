export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
export interface IBoard {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
