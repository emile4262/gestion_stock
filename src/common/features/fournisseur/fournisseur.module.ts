import { CqrsModule} from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Fournisseur, FournisseurSchema } from '../../schemas/fournisseur';
import { FournisseurController } from './fournisseur.controller';
import { Module } from '@nestjs/common';
import { CreateFournisseurHandler } from './handlers/create.fournisseur.handler';
import { GetAllFournisseurHandler } from './handlers/findAll.handlers';
import { UpdateFournisseurHandler } from './handlers/update.fournisseur.handler';
import { DeleteFournisseurHandler } from './handlers/delete.fournisseur.handler';
import { ConfigModule } from '@nestjs/config';
import { FournisseurRepository } from './repository/fournisseur.repository';


const CommandHandlers = [
  CreateFournisseurHandler,
  UpdateFournisseurHandler,
  DeleteFournisseurHandler,
];

const QueryHandlers = [GetAllFournisseurHandler];

@Module({
  imports: [
    CqrsModule, 
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Fournisseur',  schema: FournisseurSchema },
    ]),
  ],
  controllers: [FournisseurController],
  providers: [
    {
      provide: 'IFournisseurRepository',
      useClass: FournisseurRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [],
})
export class FournisseurModule {}