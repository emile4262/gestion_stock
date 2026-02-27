import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Injectable, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Fournisseur, FournisseurDocument } from "src/common/features/schemas/fournisseur";
import { CreateFournisseurCommand } from "../commands/create.fournisseur.command";


@CommandHandler(CreateFournisseurCommand)
@Injectable()
export class CreateFournisseurHandler implements ICommandHandler<CreateFournisseurCommand> {
    constructor(
        @InjectModel('Fournisseur') private fournisseurRepository: Model<FournisseurDocument>,
    ) {}


    
    async execute(command: CreateFournisseurCommand): Promise<Fournisseur> {
        const { designation } = command;
        if (!designation) {
            throw new BadRequestException('La designation du fournisseur est requise.');
        }
        const existingFournisseur = await this.fournisseurRepository.findOne({ designation });
        if (existingFournisseur) {
            throw new ConflictException('Un fournisseur avec cette designation existe déjà.');
        }
        const createdFournisseur = new this.fournisseurRepository({ designation });
        return  await createdFournisseur.save();
    }
}
