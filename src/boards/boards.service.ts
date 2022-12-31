import { Injectable, NotFoundException } from '@nestjs/common';
import { IBoard, BoardStatus } from './board.model';
import * as uuid from 'uuid';
import { CreateBoardDTO } from './dto/create-board-dto';

@Injectable()
export class BoardsService {
  private boards: IBoard[] = [];

  getAllBoards(): IBoard[] {
    return this.boards;
  }

  getBoardById(id: string): IBoard {
    const board = this.boards.find((board) => board.id === id);
    if (!board) throw new NotFoundException(`Can't find the board ${id}`);
    else return board;
  }

  deleteBoardById(id: string): string {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
    return 'delete complete';
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const newBoard = this.getBoardById(id);
    newBoard.status = status;
    return newBoard;
  }

  createBoard(createBoardDTO: CreateBoardDTO) {
    const { title, description } = createBoardDTO;
    const newBoard = {
      id: uuid.v1(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(newBoard);
    return newBoard;
  }
}
