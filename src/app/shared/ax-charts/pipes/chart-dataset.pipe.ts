import { Pipe, PipeTransform } from "@angular/core";
import { ChartSeries } from "../models/chart-series.model";
import { ChartDataSets } from "chart.js";

@Pipe({
  name: "chartDataset",
})
export class ChartDatasetPipe implements PipeTransform {
  transform(value: ChartSeries[]): ChartDataSets[] {
    return value
      .filter((series) => series)
      .map((series) => ({
        data: series.data,
        label: series.name,
        fill: false,
      }));
  }
}
