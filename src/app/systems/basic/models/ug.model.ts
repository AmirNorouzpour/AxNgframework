export interface UserAndGroup {
  name: string;
  id: number;
  type: UgType;
}

export enum UgType {
  User = 1,
  Group = 2,
}
