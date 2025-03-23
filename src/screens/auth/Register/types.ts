// types.ts
export interface RegisterFormData {
    lastName: string;
    firstName: string;
    birthDate: string;
    selectedImage: string | null;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface FormErrors {
    lastName?: string;
    firstName?: string;
    birthDate?: string;
    selectedImage?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    agreement?: string;
  }