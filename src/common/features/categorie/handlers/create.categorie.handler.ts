import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { categorieRepository } from "../repository/categorie.repository";
import { Categorie } from "src/common/schemas/categorie";
import { CreateCategorieCommand } from "../commands/create.categorie.command";

@CommandHandler(CreateCategorieCommand)
@Injectable()
export class CreateCategorieHandler implements ICommandHandler<CreateCategorieCommand> {
  constructor(
    @Inject('ICategorieRepository')
    private readonly CategorieRepository: categorieRepository,
  ) {}

 async execute(command: CreateCategorieCommand): Promise<Categorie> {  
    return this.CategorieRepository.create(command.dto);
  }

 async count(): Promise<number> {
    return this.CategorieRepository.countDocuments();
  }  
}
