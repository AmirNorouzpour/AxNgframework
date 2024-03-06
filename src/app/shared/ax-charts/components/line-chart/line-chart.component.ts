import { LineChart } from "./../../models/line-chart.model";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent,
  ApexLegend,
} from "ng-apexcharts";
import {
  RED_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  ORANGE_COLOR,
  YELLOW_COLOR,
} from "shared/ax-charts/utils/chart-color";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  colors: any;
  legend: ApexLegend;
};

@Component({
  selector: "ax-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() chartId: number;
  @Input() model: LineChart;

  public lineChartLegend = true;
  public lineChartType = "line";

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: this.model.series,
      chart: {
        height: 250,
        type: "line",
        fontFamily: "IranSans",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: this.model.title,
        align: "left",
      },
      colors: [RED_COLOR, BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR, YELLOW_COLOR],
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.model.labels,
        tickAmount: 10,
        labels: {
          formatter: function (value, timestamp, opts) {
            return value + " ";
          },
        },
      },
    };
  }
  ngOnChanges() {
    if (this.chartOptions) this.chartOptions.series = this.model.series;
  }
}
