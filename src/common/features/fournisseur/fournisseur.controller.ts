import { Post, Body, Controller, Query, Get, Inject, Param, Put, Delete, Patch } from "@nestjs/common";
import { createFournisseurDto } from "src/common/features/fournisseur/dto/create.dto";
import { CreateFournisseurCommand } from "./commands/create.fournisseur.command";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseDto } from "./dto/paginationResponse.dto";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllFournisseurQuery } from "./queries/getAll.query";
import { FournisseurRepository } from "./repository/fournisseur.repository";
import { UpdateFournisseurDto } from "./dto/updatedFournisseur";
import { UpdateFournisseurCommand } from "./commands/update.fournisseur.command";
import { DeleteFournisseurCommand } from "./commands/delete.fournisseur.command";

@Controller('fournisseur')
export class FournisseurController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('IFournisseurRepository') private readonly fournisseurRepository: FournisseurRepository,
  ) {}

  @Post('create')
  @ApiProperty({ description: 'Créer un nouveau fournisseur' })
  create(@Body() dto: createFournisseurDto) {
    return this.commandBus.execute(new CreateFournisseurCommand(dto));
  }

  @Get('fournisseurs')
  @ApiProperty({ description: 'Récupérer tous les fournisseurs' })
  getAll(@Query() dto: PaginationResponseDto) {
      return this.queryBus.execute(new GetAllFournisseurQuery(
        dto.page,
        dto.limit,
        dto.dateCreationDebut,
        dto.dateCreationFin,
        dto.search
      ));
  }

  @Put('id')
  @ApiProperty({ description: 'modifier tous fournisseur'})
   async update(
    @Param('id') id: string,
    @Body() data: UpdateFournisseurDto,
  ) {
    const result = await this.commandBus.execute(
      new UpdateFournisseurCommand(id, data),
    );

    return {
      message: 'fournisseur mise a jour',
      data: result,
    };
  }

  @Delete(':id')
  @ApiProperty({ description: 'supprimer tous fournisseur'})
  async delete(
    @Param('id') id: string,
  ) {
    const result = await this.commandBus.execute(
      new DeleteFournisseurCommand(id),
    );

    return {
      message: 'fournisseur supprimé',
      data: result,
    };
  }



}