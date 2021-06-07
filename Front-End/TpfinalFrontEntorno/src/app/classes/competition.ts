export interface  Competition {
    id: number;
    idUser:number;
    idSubject:number;
    name: string;
    description: string;
    img:string;
    creationDate: Date;
    finalDate: Date;
    state: number;
}