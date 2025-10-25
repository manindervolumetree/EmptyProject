import { Gender } from './enum';

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export interface CheckVersionResponse {
  isCritical: boolean;
  isNormalUpdate: boolean;
  latestVersion?: string;
  updateMessage?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    isEmailVerified: boolean;
  };
}

export interface ProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  registrationDate: string;
  phone_number: string;
  dob: string;
  gender: Gender;
  country: string;
  city: string;
  address: string;
  nationality: string;
  profile_image: string;
  user_id: string;
  interests: string[];
  shortlistedProgrammes: any[];
  valueAddedServices: any[];
}

export interface User {
  userId: number;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  password: string;
  role: string;
  isActive: boolean;
  forcePasswordChange: boolean;
  parentId: number | null;
  customerIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface UploadImageResponse {
  url: string;
  key: string;
  fileName: string;
}

export interface FileUploadResponse {
  url: string;
  key: string;
  fileName: string;
}
