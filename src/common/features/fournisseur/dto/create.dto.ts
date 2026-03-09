import { ApiProperty, ApiResponse } from "@nestjs/swagger";


export class createFournisseurDto {

  @ApiProperty({ description: 'La designation du fournisseur' }) 
  designation: string;
}