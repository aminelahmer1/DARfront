import { Role } from "./role";

export class User {
     id!: number;
     paswd?: string; 
     secretKey?: string; 
     firstname?: string;
     lastname?: string;
     email!: string;
     accountVerified?: boolean;
     genderType?: GenderType; 
     phonenumber?: number; 
     podepostal?: number; 
     commune?: string; 
     language?: string; 
     expertise?: string;
     banExpirationDate?:number;
     banned?:boolean;
     roles?: Role[];
     resetPasswordToken?: string;
   }
   
   export enum GenderType {
     MALE = 'Male',
     FEMALE = 'Female'
   }
   