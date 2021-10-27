export interface  Competition {
    id: number;
    idSubject:number;
    description: string;
    isActive: boolean;
    creationDate: Date;
    finalDate: Date;
    state: number;
    idUser: number;
    idPosition: number;
    subjectName: string;
    positionName: string;
}
