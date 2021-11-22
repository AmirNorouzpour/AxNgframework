import { AxTableColumnType } from "./ax-table-column-type";
import { AxReportFilterOption } from "shared/ax-report/models/ax-report-filter.model";

export interface AxTableColumn {
  title: string;
  index: string;
  type?: AxTableColumnType;
  options?: any;
  style?: string;
  cls?: string;
  showTooltip?: boolean;
  filter?: AxReportFilterOption;
}
