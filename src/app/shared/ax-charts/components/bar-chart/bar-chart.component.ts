import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  ViewChild,
} from "@angular/core";
import { BarChart } from "shared/ax-charts/models/bar-chart.model";
import {
  RED_COLOR,
  YELLOW_COLOR,
  ORANGE_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
} from "./../../utils/chart-color";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: any;
  grid: ApexGrid;
};

@Component({
  selector: "ax-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-bar-chart",
  },
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild("chart") chart: BarChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() model: BarChart;
  @Input() chartId: number;

  public barChartLegend = true;

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: this.model.series,
      chart: {
        type: "bar",
        height: 260,
        fontFamily: "IranSans",
      },
      grid: {
        show: true,
        borderColor: "#edede8",
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: [RED_COLOR, BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR, YELLOW_COLOR],
      plotOptions: {
        bar: {
          horizontal: false,
          // columnWidth: "55%",
          //  endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: this.model.labels,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val;
          },
        },
      },
    };
  }
  ngOnChanges() {
    // this.barChartOptions = Object.assign({}, this.barChartOptions, {
    //   animation: {
    //     duration: 0,
    //   },
    // });
  }
}
