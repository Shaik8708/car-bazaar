// common.interface.ts

export enum AddedBy {
  User = 'user',
  Dealer = 'dealer',
  Admin = 'admin'
}
export interface BaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  collectionName?: string;
}

export interface Images {
mainPicture?: string;
arrayImages: Array<{ img: string, _id: string }[]>;
}
export interface EmployeeDetails extends BaseEntity,Images {
employeePicture?: string;
staffName: string,
designation: string,
qualification: string,
phoneNumber: string,
city: string,
email: string,
address: string,
dob: string,
isResgistered: boolean,
status: boolean

}
export interface DealerDetails extends BaseEntity,Images {
dealerPicture?: string;
fullName: string,
shopRegisteredName: string,
aadharCardNumber: string,
phoneNumber: string,
shopAddress: string,
cityId: string,
city: string,
email: string,
dob: string,
isResgistered: string,
status: string
initialVerification: string,
bussinessDocumentVerification: string,
dealerId: string,
username: string,
aadharCard: any,
  businessCard: any,
  workLicense: any,
  letterHead: any
}

export interface Product extends BaseEntity,Images {
  price: number;
  category: string;
  city: string;
  subCategoryId: string;
  status: string;
  createdBy: AddedBy;
  creatorUserId: string;
  vehicleOwnerPhoneNumber: string;
  updatedBy: string;
  brand:string;
  model:string;
  manufactureYear:string;
  condition:string;
  fuelType:string;
  varient:string;
  driveType:string;
  transmissionType:string;
  regState:string;
  insurance:string;
  ownerShip:string;
  regYear:string;
  drivenKm:string;
  fcValidUpto:string;
  drivenHours:string;
  vehicleNumber:string;
  insuranceValidUpto:string;
  pto:string;
}


export interface Category extends BaseEntity {
  categoryName: string;
}

export interface Lead extends BaseEntity {
  categoryName: string;
  bookedVehicleId: string;
  phoneNumber: string;
  createdTime: string;
  status: string;
}
