export interface Address {
  geoTitle: string;
  content: string;
  isMainAddress: boolean;
  type: AddressType;
  insertDateTime: Date;
  userId: number;
  id: number;
  geoId: number;
}

export enum AddressType {
  Home = 0,
  Work = 1,
  Other = 2,
}
