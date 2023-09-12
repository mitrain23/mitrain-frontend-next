import { Mitra } from "../entities/mitra";



export interface registerMitra {
    execute(data: FormData): Promise<Mitra>;
}