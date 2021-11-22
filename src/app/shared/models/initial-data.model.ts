import { AxSystem } from "./ax-system.model";

export interface InitialData {
  userDisplayName: string;
  unReedMsgCount: number;
  organizationName: string;
  userTheme: string;
  dateTimeNow: string;
  userName: string;
  versionName: string;
  systemsList: AxSystem[];
  defaultSystemId: number;
  organizationLogo: string;
  userPicture: string;
}
