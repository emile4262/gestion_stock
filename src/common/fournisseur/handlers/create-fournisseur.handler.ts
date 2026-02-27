import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Fournisseur, FournisseurDocument } from "src/common/features/schemas/fournisseur";
import { CreateFournisseurCommand } from "../commands/create-fournisseur.command";

@Injectable()
@CommandHandler(CreateFournisseurCommand)
export class CreateFournisseurHandler implements ICommandHandler<CreateFournisseurCommand> {
    constructor(
        @InjectModel(Fournisseur.name) private fournisseurModel: Model<FournisseurDocument>,
    ) {}

    
    async execute(command: CreateFournisseurCommand): Promise<Fournisseur> {
        const { designation } = command;
        if (!designation) {
            throw new Error('La designation du fournisseur est requise.');
        }
        const existingFournisseur = await this.fournisseurModel.findOne({ designation });
        if (existingFournisseur) {
            throw new Error('Un fournisseur avec cette designation existe déjà.');
        }
        const createdFournisseur = new this.fournisseurModel({ designation });
        return await createdFournisseur.save();
    }
}
