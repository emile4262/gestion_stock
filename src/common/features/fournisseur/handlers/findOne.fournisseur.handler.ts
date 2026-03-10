import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOneFournisseurQuery } from "../queries/getOne.query";
import { FournisseurRepository } from "../repository/fournisseur.repository";
import { Inject } from "@nestjs/common";
import { Fournisseur } from "src/common/schemas/fournisseur";


@QueryHandler(GetOneFournisseurQuery)
export class GetOneFournisseurHandler implements IQueryHandler<GetOneFournisseurQuery>
{
    constructor(
        @Inject('IFournisseurRepository')
        private readonly fournisseurRepository: FournisseurRepository,
    ){}

    async execute(query: GetOneFournisseurQuery): Promise<Fournisseur> {
        return await this.fournisseurRepository.findOne(query.id);
    }
}