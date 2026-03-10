import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Categorie } from "src/common/schemas/categorie";
import { GetOneCategorieQuery } from "../queries/getOne.query";
import { categorieRepository } from "../repository/categorie.repository";


@QueryHandler(GetOneCategorieQuery)
export class GetOneCategorieHandler implements IQueryHandler<GetOneCategorieQuery>
{
    constructor(
        @Inject('ICategorieRepository')
        private readonly CategorieRepository: categorieRepository,
    ){}

    async execute(query: GetOneCategorieQuery): Promise<Categorie> {
        return await this.CategorieRepository.findOne(query.id);
    }
}