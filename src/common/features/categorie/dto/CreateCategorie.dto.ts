import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class createCategorieDto {

  @ApiProperty({ description: 'Le nom de la catégorie' }) 
  @IsString()
  nom: string;

  @ApiProperty({ 
    description: 'L\'ID du fournisseur',
    required: true
   }) 
  @IsString()
  fournisseurId: string;
}