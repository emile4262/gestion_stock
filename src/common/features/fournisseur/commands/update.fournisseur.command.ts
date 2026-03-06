import { UpdateFournisseurDto } from '../dto/updatedFournisseur';

export class UpdateFournisseurCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateFournisseurDto,
    public readonly updatedBy?: string,
  ) {}
}