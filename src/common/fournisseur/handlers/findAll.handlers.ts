import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllFournisseurQuery } from '../queries/getAll.query';
import { FournisseurRepository } from '../repository/fournisseur.repository';


@QueryHandler(GetAllFournisseurQuery) 
export class GetAllFournisseurHandler
  implements IQueryHandler<GetAllFournisseurQuery>
{
  constructor(
    @Inject('IFournisseurRepository')
    private readonly fournisseurRepository: FournisseurRepository,
  ) {}

  async execute(query: GetAllFournisseurQuery) {
    const { page = 1, limit = 10, search, dateCreationDebut, dateCreationFin } = query;

    const where: any = { deletedAt: null };

    if (search) {
      where.designation = { $regex: search, $options: 'i' };
    }

    if (dateCreationDebut && dateCreationFin) {
      where.createdAt = { $gte: new Date(dateCreationDebut), $lte: new Date(dateCreationFin) };
    } else if (dateCreationDebut) {
      where.createdAt = { $gte: new Date(dateCreationDebut) };
    } else if (dateCreationFin) {
      where.createdAt = { $lte: new Date(dateCreationFin) };
    }

    const data = await this.fournisseurRepository
      .find(where)
      .sort({ createdAt: -1, _id: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .exec();

    const total = await this.fournisseurRepository.countDocuments(where);

    return {
      data,
      total,
      page: +page,
      limit: +limit
    };
  }
}