import { AxChartLabel } from "./ax-chart-label.model";
import { ChartSeries } from "./chart-series.model";
import { AxChartType } from "./ax-chart-type.model";

export interface PieChart {
  series: ChartSeries;
  labels: AxChartLabel[];
  id: number;
  title: string;
  nextChartId: number;
  nextChartType: AxChartType;
}
