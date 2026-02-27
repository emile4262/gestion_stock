import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationResponseDto } from '../dto/paginationResponse.dto';
import { createFournisseurDto } from '../dto/create.dto';
import { InterfaceFournisseur } from './interface.fournisseur';

@Injectable()
export class FournisseurRepository implements InterfaceFournisseur {
  constructor(
    @InjectModel('Fournisseur')
    private readonly fournisseurModel: Model<any>,
  ) {}


   findAll(dto: PaginationResponseDto): Promise<any> {
    return this.fournisseurModel.find(dto);
  }

  async create(dto: createFournisseurDto): Promise<any> {   
    return this.fournisseurModel.create(dto);
  }

  find(where: any): any {
    return this.fournisseurModel.find(where);
  }

  countDocuments(where: any): Promise<number> {
    return this.fournisseurModel.countDocuments(where);
  }

//   async findByDesignation(designation: string): Promise<any> {
//     return this.fournisseurModel.findOne({ 
//       designation, 
//       deletedAt: null 
//     });
//   }

//   async findById(id: string): Promise<any> {
//     return this.fournisseurModel.findOne({ 
//       _id: id, 
//       deletedAt: null 
//     });
//   }

//   async update(id: string, data: Partial<any>): Promise<any> {
//     return this.fournisseurModel.findByIdAndUpdate(
//       id, 
//       { ...data, updatedAt: new Date() }, 
//       { new: true }
//     );
//   }

//   async softDelete(id: string): Promise<void> {
//     await this.fournisseurModel.findByIdAndUpdate(
//       id, 
//       { deletedAt: new Date() }
//     );
//   }
}
