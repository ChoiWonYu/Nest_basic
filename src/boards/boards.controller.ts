import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './dto/create-board-dto';
import { BoardStatuValidationPipe } from './pipe/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get()
  // getAllBoard(): IBoard[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDTO: CreateBoardDTO) {
  //   return this.boardsService.createBoard(createBoardDTO);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getOneBoard(@Param('id') id: string) {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteOneBoard(@Param('id') id: string) {
  //   return this.boardsService.deleteBoardById(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatuValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
