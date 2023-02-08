export interface IPerson {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
} 

export interface ICreate {
    id: number,
    person: IPerson
}
  