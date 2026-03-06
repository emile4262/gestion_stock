import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DeleteFournisseurCommand } from '../commands/delete.fournisseur.command';
import { FournisseurRepository } from '../repository/fournisseur.repository';
import { Fournisseur } from 'src/common/schemas/fournisseur';

@CommandHandler(DeleteFournisseurCommand)
@Injectable()
export class DeleteFournisseurHandler implements ICommandHandler<DeleteFournisseurCommand> {
  constructor(
    @Inject('IFournisseurRepository')
    private readonly fournisseurRepository: FournisseurRepository,
  ) {}

  async execute(command: DeleteFournisseurCommand): Promise<Fournisseur> {
    return this.fournisseurRepository.deleteFournisseur(command.id);
  }
}
