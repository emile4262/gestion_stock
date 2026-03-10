import { CqrsModule} from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategorieSchema } from 'src/common/schemas/categorie';
import { CreateCategorieHandler } from './handlers/create.categorie.handler';
import { UpdateCategorieHandler } from './handlers/update.categorie.handler';
import { DeleteCategorieHandler } from './handlers/delete.categorie.handlers';
import { GetAllCategorieHandler } from './handlers/findAll.handlers';
import { GetOneCategorieHandler } from './handlers/findOne.handlers';
import { CategorieController } from './categorie.controller';
import { categorieRepository } from './repository/categorie.repository';


const CommandHandlers = [
  CreateCategorieHandler,
  UpdateCategorieHandler,
  DeleteCategorieHandler,
];

const QueryHandlers = [GetAllCategorieHandler, GetOneCategorieHandler ];

@Module({
  imports: [
    CqrsModule, 
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Categorie',  schema: CategorieSchema },
    ]),
  ],
  controllers: [CategorieController],
  providers: [
    {
      provide: 'ICategorieRepository',
      useClass: categorieRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [],
})
export class CategorieModule {}