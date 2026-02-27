import { PaginationResponseDto } from '../dto/paginationResponse.dto';
import { createFournisseurDto } from '../dto/create.dto';

export interface InterfaceFournisseur {
    findAll(dto: PaginationResponseDto): Promise<any>;
    
    create(dto: createFournisseurDto): Promise<any>;
    
    find(where: any): any;
    
    countDocuments(where: any): Promise<number>;
    
    // findByDesignation(designation: string): Promise<any>;
    
    // findById(id: string): Promise<any>;
    
    // update(id: string, data: Partial<any>): Promise<any>;
    
    // softDelete(id: string): Promise<void>;
}