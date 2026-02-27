import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationResponseDto } from '../dto/paginationResponse.dto';
import { createFournisseurDto } from '../dto/create.dto';

@Injectable()
export class FournisseurRepository implements FournisseurRepository {
  constructor(
    @InjectModel('Fournisseur')
    private readonly fournisseurModel: Model<any>,
  ) {}

  async findAll(dto: PaginationResponseDto): Promise<any> {
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
}
