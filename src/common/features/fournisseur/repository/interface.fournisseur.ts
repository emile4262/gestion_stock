import { PaginationResponseDto } from '../dto/paginationResponse.dto';
import { createFournisseurDto } from '../dto/create.dto';
import { Fournisseur } from 'src/common/schemas/fournisseur';
import { PaginationService } from '../../../pagination/pagination';
import { UpdateFournisseurDto } from '../dto/updatedFournisseur';

export interface InterfaceFournisseur {
    findAllByFournisseur(dto: PaginationResponseDto): Promise<PaginationService<Fournisseur>>;
    
    create(dto: createFournisseurDto): Promise<Fournisseur>;
    
    findOne(id: string): Promise<Fournisseur>;

    updateFournisseur(id: string, updateFournisseurDto: UpdateFournisseurDto): Promise<Fournisseur>,

    deleteFournisseur(id: string): Promise<Fournisseur>
    
    countDocuments(): Promise<number>;

    
}