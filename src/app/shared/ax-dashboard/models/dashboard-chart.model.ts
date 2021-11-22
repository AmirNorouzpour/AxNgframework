import { AxChartType } from "shared/ax-charts/models/ax-chart-type.model";

export interface DashboardChart {
  title: string;
  reportId: number;
  chartType: AxChartType;
  width: number;
  height: number;
  orderIndex: number;
  id: number;
  isLive: boolean;
}
