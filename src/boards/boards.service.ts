import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import * as uuid from 'uuid';
import { CreateBoardDTO } from './dto/create-board-dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find board ${id}`);
    }
    return found;
  }

  // getAllBoards(): IBoard[] {
  //   return this.boards;
  // }
  // getBoardById(id: string): IBoard {
  //   const board = this.boards.find((board) => board.id === id);
  //   if (!board) throw new NotFoundException(`Can't find the board ${id}`);
  //   else return board;
  // }
  // deleteBoardById(id: string): string {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  //   return 'delete complete';
  // }
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const newBoard = this.getBoardById(id);
  //   newBoard.status = status;
  //   return newBoard;
  // }
  // createBoard(createBoardDTO: CreateBoardDTO) {
  //   const { title, description } = createBoardDTO;
  //   const newBoard = {
  //     id: uuid.v1(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(newBoard);
  //   return newBoard;
  // }
}
