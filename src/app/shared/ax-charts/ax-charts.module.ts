import { AxCommonModule } from "./../ax-common/ax-common.module";
import { ListWidgetColumnsPipe } from "./pipes/list-widget-columns.pipe";
import { NgModule } from "@angular/core";
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";
import { NumberWidgetComponent } from "./components/number-widget/number-widget.component";
import { SharedMaterialModule } from "shared/material/shared-material.module";
import { CommonModule } from "@angular/common";
import { ChartLabelPipe } from "./pipes/chart-label.pipe";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { ChartDatasetPipe } from "./pipes/chart-dataset.pipe";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { ListWidgetComponent } from "./components/list-widget/list-widget.component";
import { ChartPanelComponent } from "./components/chart-panel/chart-panel.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    PieChartComponent,
    NumberWidgetComponent,
    BarChartComponent,
    ChartLabelPipe,
    ListWidgetColumnsPipe,
    ChartDatasetPipe,
    LineChartComponent,
    ListWidgetComponent,
    ChartPanelComponent,
  ],
  imports: [
    SharedMaterialModule,
    CommonModule,
    AxCommonModule,
    NgApexchartsModule,
  ],
  exports: [
    NgApexchartsModule,
    PieChartComponent,
    NumberWidgetComponent,
    BarChartComponent,
    LineChartComponent,
    ListWidgetComponent,
    ChartPanelComponent,
  ],
})
export class AxChartsModule {}
