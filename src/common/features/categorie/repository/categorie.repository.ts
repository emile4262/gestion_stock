import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { createCategorieDto } from "../dto/CreateCategorie.dto";
import { Categorie } from "src/common/schemas/categorie";
import { Model } from 'mongoose';
import { PaginationService } from "src/common/pagination/pagination";
import { PaginationResponseDto } from "../dto/paginationResponse.dto";
import { UpdateCategorieDto } from "../dto/updatedCategorie.dto";
import { InterfaceCategorie } from "./interface.categorie";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class categorieRepository implements InterfaceCategorie{
    constructor(
        @InjectModel('Categorie')
        private readonly categorieModel: Model<any>
    ){}

async create(dto: createCategorieDto): Promise<Categorie> {
    const verification = await this.categorieModel.findOne(dto);
    if (verification) {
      throw new BadRequestException('le nom de la categorie existe déjà.');
    }

    const fournisseur = await this.categorieModel.findById(dto.fournisseurId);
    if (!fournisseur) {
      throw new BadRequestException('Fournisseur non trouvé.');
    }
    
     const creat = await this.categorieModel.create(dto);
     return creat;
  
    
  }

  async findAllByCategorie(
      dto: PaginationResponseDto,
      fournisseurId: string,
    ): Promise<PaginationService<Categorie>>{
      const { search, page, limit, dateCreationDebut, dateCreationFin } = dto;
      const query: any = {};

      if (fournisseurId) {
      query.fournisseurId = fournisseurId;
    }
  
      const Page = page ? parseInt(String(page), 10) : 1;
      const Limit = limit ? parseInt(String(limit), 10) : 10;
  
      

      if (search) {
        query.designation = { $regex: search, $options: 'i' };
      }
      // Filtres de date - corrigé pour fonctionner individuellement
      if (dateCreationDebut || dateCreationFin) {
      }
  
      const data = await this.categorieModel
        .find(query)
        .sort({ createdAt: 'desc', _id: 'desc' })
        .skip((Page - 1) * Limit)
        .populate('fournisseurId')
        .limit(Limit)
        .exec();
              
      const total = await this.categorieModel.countDocuments(query);
      return new PaginationService<Categorie>(data, Page, Limit, total);
    } 
  
   async findOne(id: string): Promise<Categorie> {
    const categorie = await this.categorieModel.findById(id).exec();
    if (!categorie) {
      throw new NotFoundException('Categorie non trouvé');
    }
    return categorie;
  }
  
    async countDocuments(): Promise<number> {
      return this.categorieModel.countDocuments();
    }
  
    async updateCategorie(id: string, updated: UpdateCategorieDto): Promise<Categorie> {
    const Categorie = await this.categorieModel.findByIdAndUpdate(
      id,
      { $set: { ...updated, updatedAt: new Date() } },
      { new: true },
    );
  
    if (Categorie) {
      throw new NotFoundException(`Categorie non trouvé.`);
    }
  
    return Categorie;
  }
  
    async deleteCategorie(id: string): Promise<Categorie> {
      const Categorie = await this.categorieModel.findById(id);
  
      if (!Categorie) {
        throw new NotFoundException('Categorie non trouvé.');
      }
  
      // Soft delete - mettre à jour deletedAt
      const deletedCategorie = await this.categorieModel
        .findByIdAndUpdate(
          id,
          { $set: { deletedAt: new Date() } },
          { returnDocument: 'after' }
        )
        .exec();
  
      return deletedCategorie;
    }
    

}