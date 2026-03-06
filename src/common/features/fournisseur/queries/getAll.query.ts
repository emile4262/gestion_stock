export class GetAllFournisseurQuery {
  constructor(
    public readonly page?: string,
    public readonly limit?: string,
    public readonly fournisseurId?: string,
    public readonly dateCreationDebut?: string,
    public readonly dateCreationFin?: string,
    public readonly search?: string
  ) {}
}