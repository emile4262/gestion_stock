export class GetAllCategorieQuery {
  constructor(
    public readonly page?: string,
    public readonly limit?: string,
    public readonly categorieId?: string,
    public readonly fournisseurId?: string,
    public readonly dateCreationDebut?: string,
    public readonly dateCreationFin?: string,
    public readonly search?: string
  ) {}
}