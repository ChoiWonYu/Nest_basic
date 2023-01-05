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
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return found;
  }
  async deleteBoard(id: number) {
    const targetBoard = await this.getBoardById(id);
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`There's no board with id ${id}`);
    } else {
      return targetBoard;
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const newBoard = await this.getBoardById(id);
    newBoard.status = status;
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
