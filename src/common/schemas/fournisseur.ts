import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FournisseurDocument = Fournisseur & Document;

@Schema()
export class Fournisseur {
    @Prop({ required: true })
    designation: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
    
    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date , default: Date.now })
    deletedAt: Date;
}

export const FournisseurSchema = SchemaFactory.createForClass(Fournisseur);
  