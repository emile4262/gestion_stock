import { Post, Body, Controller, Query, Get, Inject, Param, Put, Delete, Patch } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseDto } from "./dto/paginationResponse.dto";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { createCategorieDto } from "./dto/CreateCategorie.dto";
import { UpdateCategorieDto } from "./dto/updatedCategorie.dto";
import { GetAllCategorieQuery } from "./queries/getAll.query";
import { CreateCategorieCommand } from "./commands/create.categorie.command";
import { UpdateCategorieCommand } from "./commands/update.categorie.command";
import { DeleteCategorieCommand } from "./commands/delete.categorie.command";
import { categorieRepository } from "./repository/categorie.repository";
import { GetOneCategorieQuery } from "./queries/getOne.query";

@Controller('Categorie')
export class CategorieController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('ICategorieRepository') private readonly CategorieRepository: categorieRepository,
  ) {}

  @Post('create')
  @ApiProperty({ description: 'Créer un nouveau Categorie' })
  create(@Body() dto: createCategorieDto) {
    console.log('DTO de création reçu:', dto); // Debug
    return this.commandBus.execute(new CreateCategorieCommand(dto));
  }

  @Get('fournisseurId')
  @ApiProperty({ description: 'Récupérer tous les Categories' })
  getAll(@Query() dto: PaginationResponseDto ,
  @Query('fournisseurId') fournisseurId: string 
) {
    if (!fournisseurId) {
      throw new Error('fournisseurId is required in query parameters');
    }
    
    return this.queryBus.execute(new GetAllCategorieQuery(
      dto.page,
      dto.limit,
      fournisseurId,
      dto.dateCreationDebut,
      dto.dateCreationFin,
      dto.search
    ));
  }

  @Get(':categorieId')
  @ApiProperty({description: 'Récupérer une catégorie spécifique'})
  findOne(@Param('categorieId') id: string){
    console.log('ID de catégorie reçu:', id); // Debug
    return this.queryBus.execute(new GetOneCategorieQuery(
        id
    ))
  }

  @Put(':categorieId')
  @ApiProperty({ description: 'modifier tous Categorie'})
   async update(
    @Param('categorieId') id: string,
    @Body() data: UpdateCategorieDto,
  ) {
    const result = await this.commandBus.execute(
      new UpdateCategorieCommand(id, data),
    );

    return {
      message: 'Categorie mise a jour',
      data: result,
    };
  }

  @Delete(':id')
  @ApiProperty({ description: 'supprimer tous Categorie'})
  async delete(
    @Param('id') id: string,
  ) {
    const result = await this.commandBus.execute(
      new DeleteCategorieCommand(id),
    );

    return {
      message: 'Categorie supprimé',
      data: result,
    };
  }



}