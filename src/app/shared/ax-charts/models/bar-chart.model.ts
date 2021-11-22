import { AxChartSeries } from "./ax-chart-series.model";
import { AxChartType } from "./ax-chart-type.model";

export interface BarChart {
  id: number;
  xField: string;
  yField: string;
  series: AxChartSeries[];
  labels: string[];
  nextChartId: number;
  nextChartType: AxChartType;
  title: string;
}
