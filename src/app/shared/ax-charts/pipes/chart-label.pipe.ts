import { AxChartLabel } from "./../models/ax-chart-label.model";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "chartLabel",
})
export class ChartLabelPipe implements PipeTransform {
  transform(value: AxChartLabel[]): string[] {
    return value.map((label) => label.name);
  }
}
