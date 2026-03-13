import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PaginationService } from '../../../pagination/pagination';
import { Categorie } from 'src/common/schemas/categorie';
import { GetAllCategorieQuery } from '../queries/getAll.query';
import { categorieRepository } from '../repository/categorie.repository';
import { PaginationResponseDto } from '../dto/paginationResponse.dto';

@QueryHandler(GetAllCategorieQuery) 
export class GetAllCategorieHandler implements IQueryHandler<GetAllCategorieQuery>
{
  constructor(
    @Inject('ICategorieRepository')
    private readonly CategorieRepository: categorieRepository,
  ) {}

  async execute(query: GetAllCategorieQuery): Promise<PaginationService<Categorie>> {
      if (!query.fournisseurId) {
        throw new Error('fournisseurId is required');
      }
      
      const paginationDto: PaginationResponseDto = {
        page: query.page,
        limit: query.limit,
        search: query.search,
        dateCreationDebut: query.dateCreationDebut,
        dateCreationFin: query.dateCreationFin
      };
      
      return await this.CategorieRepository.findAllByCategorie(paginationDto, query.fournisseurId);
    }
}