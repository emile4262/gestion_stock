import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DeleteCategorieCommand } from '../commands/delete.categorie.command';
import { Categorie } from 'src/common/schemas/categorie';
import { categorieRepository } from '../repository/categorie.repository';

@CommandHandler(DeleteCategorieCommand)
@Injectable()
export class DeleteCategorieHandler implements ICommandHandler<DeleteCategorieCommand> {
  constructor(
    @Inject('ICategorieRepository')
    private readonly categorieRepository: categorieRepository,
  ) {}

  async execute(command: DeleteCategorieCommand): Promise<Categorie> {
      return this.categorieRepository.deleteCategorie(command.id);
    }
  }

