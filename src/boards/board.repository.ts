import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board-dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDTO;
    const newBoard = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(newBoard);
    return newBoard;
  }
}
