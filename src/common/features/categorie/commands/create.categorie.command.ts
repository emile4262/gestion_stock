import { createCategorieDto } from "../dto/CreateCategorie.dto";

export class CreateCategorieCommand {
    constructor(public readonly dto: createCategorieDto) {}
}
