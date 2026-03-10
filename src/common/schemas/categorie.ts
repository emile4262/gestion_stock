import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategorieDocument = Categorie & Document;

@Schema()
export class Categorie {

    @Prop({ type: Types.ObjectId, ref: 'fournisseur', required: true })
    fournisseurId: Types.ObjectId;
    
    @Prop({ required: true })
    nom: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
    
    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date , default: Date.now })
    deletedAt: Date;
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
  