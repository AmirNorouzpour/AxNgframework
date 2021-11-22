import { AxChartLabel } from "./../models/ax-chart-label.model";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "listWidgetColumns",
})
export class ListWidgetColumnsPipe implements PipeTransform {
  transform(value: any): string[] {
    return value.map((col) => col.name);
  }
}
