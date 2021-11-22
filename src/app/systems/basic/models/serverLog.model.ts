export interface ServerLog {
  level: string;
  message: string;
  userName: string;
  url: string;
  serverName: string;
  callsite: string;
  id: number;
  logged: Date;
  ip: string;
  type: string;
  userAgent: string;
  exception: string;
  logger: string;
}
