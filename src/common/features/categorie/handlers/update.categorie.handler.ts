import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UpdateCategorieCommand } from '../commands/update.categorie.command';
import { categorieRepository } from '../repository/categorie.repository';

@CommandHandler(UpdateCategorieCommand)
@Injectable()
export class UpdateCategorieHandler implements ICommandHandler<UpdateCategorieCommand> {
  constructor(
    @Inject('ICategorieRepository')
    private readonly CategorieRepository: categorieRepository,
  ) {}

  async execute(command: UpdateCategorieCommand): Promise<any> {
    return this.CategorieRepository.updateCategorie(command.id, command.data);
  }
}
