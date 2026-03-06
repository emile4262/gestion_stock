import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Injectable,
  Inject,
} from '@nestjs/common';
import { CreateFournisseurCommand } from '../commands/create.fournisseur.command';
import { FournisseurRepository } from '../repository/fournisseur.repository';
import { Fournisseur } from 'src/common/schemas/fournisseur';

@CommandHandler(CreateFournisseurCommand)
@Injectable()
export class CreateFournisseurHandler implements ICommandHandler<CreateFournisseurCommand> {
  constructor(
    @Inject('IFournisseurRepository')
    private readonly fournisseurRepository: FournisseurRepository,
  ) {}

 async execute(command: CreateFournisseurCommand): Promise<Fournisseur> {  
    return this.fournisseurRepository.create(command.dto);
  }

 async count(): Promise<number> {
    return this.fournisseurRepository.countDocuments();
  }  
}
