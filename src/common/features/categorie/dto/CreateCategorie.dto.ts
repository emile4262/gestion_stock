import { ApiProperty, ApiResponse } from "@nestjs/swagger";


export class createCategorieDto {

  @ApiProperty({ description: 'Le nom de la catégorie' }) 
  nom: string;
}