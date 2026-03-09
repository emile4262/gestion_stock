import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationResponseDto } from '../dto/paginationResponse.dto';
import { createFournisseurDto } from '../dto/create.dto';
import { InterfaceFournisseur } from './interface.fournisseur';
import { Fournisseur } from 'src/common/schemas/fournisseur';
import { PaginationService } from 'src/common/pagination/pagination';
import { UpdateFournisseurDto } from '../dto/updatedFournisseur';

@Injectable()
export class FournisseurRepository implements InterfaceFournisseur {
  constructor(
    @InjectModel('Fournisseur')
    private readonly fournisseurModel: Model<any>,
  ) {}

   async create(dto: createFournisseurDto): Promise<Fournisseur> {
    const verification = await this.fournisseurModel.findOne(dto);
    if (verification) {
      throw new BadRequestException('Un fournisseur avec cette designation existe déjà.');
    }
     const creat = await this.fournisseurModel.create(dto);
     return creat;
  
    
  }

  async findAllByFournisseur(
    dto: PaginationResponseDto,
  ): Promise<PaginationService<Fournisseur>>{
    const { search, page, limit, dateCreationDebut, dateCreationFin } = dto;
    const query: any = {};

    const Page = page ? parseInt(String(page), 10) : 1;
    const Limit = limit ? parseInt(String(limit), 10) : 10;

    if (search) {
      query.designation = { $regex: search, $options: 'i' };
    }
    // Filtres de date - corrigé pour fonctionner individuellement
    if (dateCreationDebut || dateCreationFin) {
      query.createdAt = {};
      if (dateCreationDebut) {
        query.createdAt.$gte = new Date(dateCreationDebut);
      }
      if (dateCreationFin) {
        const endDate = new Date(dateCreationFin);
        endDate.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endDate;
      }
    }

    const data = await this.fournisseurModel
      .find(query)
      .sort({ createdAt: 'desc', _id: 'desc' })
      .skip((Page - 1) * Limit)
      .limit(Limit)
      .exec();
            
    const total = await this.fournisseurModel.countDocuments(query);
    return new PaginationService<Fournisseur>(data, Page, Limit, total);
  } 

  async findById(id: string): Promise<Fournisseur> {
    const foursseurId = await this.fournisseurModel.findById(id);
    if (!foursseurId) {
      throw new BadRequestException('Fournisseur non trouvé.');
    }
    return foursseurId;
  }

  async countDocuments(): Promise<number> {
    return this.fournisseurModel.countDocuments();
  }

  async updateFournisseur(id: string, updated: UpdateFournisseurDto): Promise<Fournisseur> {
  const fournisseur = await this.fournisseurModel.findByIdAndUpdate(
    id,
    { $set: { ...updated, updatedAt: new Date() } },
    { new: true },
  );

  if (fournisseur) {
    throw new NotFoundException(`Fournisseur non trouvé.`);
  }

  return fournisseur;
}

  async deleteFournisseur(id: string): Promise<Fournisseur> {
    const fournisseur = await this.fournisseurModel.findById(id);

    if (!fournisseur) {
      throw new NotFoundException('Fournisseur non trouvé.');
    }

    // Soft delete - mettre à jour deletedAt
    const deletedFournisseur = await this.fournisseurModel
      .findByIdAndUpdate(
        id,
        { $set: { deletedAt: new Date() } },
        { returnDocument: 'after' }
      )
      .exec();

    return deletedFournisseur;
  }
  
}
