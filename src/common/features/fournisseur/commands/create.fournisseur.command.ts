import { createFournisseurDto } from "../dto/create.dto";

export class CreateFournisseurCommand {
    constructor(public readonly dto: createFournisseurDto) {}
}
