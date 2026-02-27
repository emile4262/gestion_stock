
export class GetAllFournisseurQuery {
  constructor(
    public readonly page: string,
    public readonly limit: string,
    public readonly fournisseurId?: string,
    public readonly dateCreationDebut?: Date,
    public readonly dateCreationFin?: Date,
    public readonly search?: string
  ) {}
}