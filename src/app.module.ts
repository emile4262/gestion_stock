import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { FournisseurModule } from './common/fournisseur/fournisseur_module';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    FournisseurModule,
    BullModule.forRootAsync({
      imports: [
        ConfigModule,
        ],
      useFactory: (config: ConfigService) => {
        return {
          redis: {
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT')
              ? Number(config.get('REDIS_PORT') ?? 6379)
              : 6379,
            password: config.get('REDIS_PASSWORD') || '',
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CommandBus,
    QueryBus,
    
  ],
})
export class AppModule {}