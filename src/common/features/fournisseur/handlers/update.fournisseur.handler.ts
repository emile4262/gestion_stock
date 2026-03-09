import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UpdateFournisseurCommand } from '../commands/update.fournisseur.command';
import { InterfaceFournisseur } from '../repository/interface.fournisseur';
import { FournisseurRepository } from '../repository/fournisseur.repository';

@CommandHandler(UpdateFournisseurCommand)
@Injectable()
export class UpdateFournisseurHandler implements ICommandHandler<UpdateFournisseurCommand> {
  constructor(
    @Inject('IFournisseurRepository')
    private readonly fournisseurRepository: FournisseurRepository,
  ) {}

  async execute(command: UpdateFournisseurCommand): Promise<any> {
    return this.fournisseurRepository.updateFournisseur(command.id, command.data);
  }
}
