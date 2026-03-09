import { PaginationService } from "src/common/pagination/pagination";
import { PaginationResponseDto } from "../dto/paginationResponse.dto";
import { Categorie } from "src/common/schemas/categorie";
import { createCategorieDto } from "../dto/CreateCategorie.dto";
import { UpdateCategorieDto } from "../dto/updatedCategorie.dto";

export interface InterfaceCategorie {
    findAllByCategorie(dto: PaginationResponseDto): Promise<PaginationService<Categorie>>;
    
    create(dto: createCategorieDto): Promise<Categorie>;
        
    findById(id: string): Promise<Categorie>;

    updateCategorie(id: string, updateCategorieDto: UpdateCategorieDto): Promise<Categorie>,

    deleteCategorie(id: string): Promise<Categorie>
    
    countDocuments(): Promise<number>;

    
}