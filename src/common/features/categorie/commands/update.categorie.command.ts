import { UpdateCategorieDto } from "../dto/updatedCategorie.dto";

export class UpdateCategorieCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateCategorieDto,
    public readonly updatedBy?: string,
  ) {}
}