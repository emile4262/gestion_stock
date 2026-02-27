import { Post, Body, Controller, Query, Get } from "@nestjs/common";
import { createFournisseurDto } from "src/common/fournisseur/dto/create.dto";
import { CreateFournisseurCommand } from "./commands/create-fournisseur.command";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseDto } from "./dto/paginationResponse.dto";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllFournisseurQuery } from "./queries/getAll.query";

@Controller('fournisseur')
export class FournisseurController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiProperty({ description: 'Créer un nouveau fournisseur' })
  create(@Body() dto: createFournisseurDto) {
    return this.commandBus.execute(new CreateFournisseurCommand(dto.designation));
  }

  @Get('all')
  @ApiProperty({ description: 'Récupérer tous les fournisseurs' })
  getAll(@Query() dto: PaginationResponseDto) {
      return this.queryBus.execute(new GetAllFournisseurQuery(dto.page, dto.limit));
  }

}