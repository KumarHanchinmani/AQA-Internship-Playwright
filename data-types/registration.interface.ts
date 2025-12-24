export interface RegistrationData {
    
    firstName: string;
    lastName: string;
    birthDate : BirthDate;
    email : string ;
    password : string ;
    confirmPassword : string ;
  }


  export interface BirthDate {
    day: number;
    month: string;
    year: string;
  }
  