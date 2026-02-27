import { CqrsModule} from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Fournisseur, FournisseurSchema } from '../features/schemas/fournisseur';
import { FournisseurController } from './fournisseur.controller';
import { Module } from '@nestjs/common';
import { CreateFournisseurHandler } from './handlers/create.fournisseur.handler';
import { GetAllFournisseurHandler } from './handlers/findAll.handlers';
import { ConfigModule } from '@nestjs/config';
import { FournisseurRepository } from './repository/fournisseur.repository';


const CommandHandlers = [
  CreateFournisseurHandler,
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