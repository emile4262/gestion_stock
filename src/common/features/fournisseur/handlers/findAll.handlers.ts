import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllFournisseurQuery } from '../queries/getAll.query';
import { FournisseurRepository } from '../repository/fournisseur.repository';
import { Fournisseur } from 'src/common/schemas/fournisseur';
import { PaginationService } from '../../../pagination/pagination';


@QueryHandler(GetAllFournisseurQuery) 
export class GetAllFournisseurHandler implements IQueryHandler<GetAllFournisseurQuery>
{
  constructor(
    @Inject('IFournisseurRepository')
    private readonly fournisseurRepository: FournisseurRepository,
  ) {}

  async execute(query: GetAllFournisseurQuery): Promise<PaginationService<Fournisseur>> {
      return await this.fournisseurRepository.findAllByFournisseur(query);
    }
}