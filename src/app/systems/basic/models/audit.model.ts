export interface Audit {
  tableName: string;
  userDisplay: string;
  primaryKey: number;
  auditTypeDisplay: number;
  entityInsertDateTime: Date;
}
