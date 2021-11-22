export interface AxReportFilter {
  property: string;
  value1: any;
  value2?: any;
  operation: AxReportFilterOperationType;
}

export interface AxReportFilterOption {
  type: AxReportFilterType;
  options: any;
}

export enum AxReportFilterOperationType {
  Between = 1,
  Contains = 2,
  DoesNotContain = 3,
  EndsWith = 4,
  EqualTo = 5,
  GreaterThan = 6,
  GreaterThanOrEqualTo = 7,
  In = 8,
  NotIn = 9,
  IsNull = 10,
  IsEmpty = 11,
  IsNotEmpty = 12,
  IsNotNull = 13,
  IsNotNullNorWhiteSpace = 14,
  LessThan = 15,
  LessThanOrEqualTo = 16,
  NotEqualTo = 17,
  StartsWith = 18,
}

export enum AxReportFilterType {
  Text = "text",
  Number = "number",
  Date = "date",
  Boolean = "boolean",
  ForeignKey = "foreignKey",
  Enum = "enum",
}
